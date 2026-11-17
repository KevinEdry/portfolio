// @ts-nocheck — adapted vendor code, kept close to upstream for diffability.
'use client';

// Adapted from the Annnimate starter pack's floating-navbar (free license:
// "yours to use in any project"). Changes from upstream: the dock state is
// driven imperatively by route depth instead of ScrollTrigger (this site
// navigates between full-viewport pages and never scrolls the window),
// navigation goes through a callback so Next's router handles it, and the
// current route's link is marked. Visual tokens live in the CSS copy.

import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CustomEase } from 'gsap/CustomEase';
import './floating-navbar.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, CustomEase);
  if (!CustomEase.get('annnimate')) {
    CustomEase.create('annnimate', 'M0,0 C0.3,0.9 0.1,1 1,1');
  }
}

const CONTENT_LAG = 0.04;
// the row lifts a little faster than it travels, so each item bows into the pill
const LIFT_SCALE = 0.82;
// the wordmark tail is folded away before the walls arrive
const FOLD_SCALE = 0.74;
const PILL_PAD = 6;
// kept letters sit as far from the left wall as the CTA label sits from the right
const MARK_INSET = 22;
const GLASS_FILL = 0.62;
const GLASS_BLUR = 18;
const GLASS_SAT = 1.6;
const RM_FADE = 0.2;
const RESIZE_DEBOUNCE = 150;
const MEASURE_CLASS = 'is-measuring';
const DOCKED_CLASS = 'is-docked';

/** @type {import('react').ForwardRefExoticComponent<Record<string, unknown> & import('react').RefAttributes<unknown>>} */
const FloatingNavbar = forwardRef(function FloatingNavbar({
  className = '',
  duration = 0.42,
  ease = 'annnimate',
  offset = 12,
  mark = 'K',
  wordmark = 'Kevin',
  links = [],
  ctaLabel = 'Contact',
  ctaHref = '/contact',
  currentPath = '/',
  onNavigate = null,
}, ref) {
  const headerRef = useRef(null);
  const bgRef = useRef(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const tailInnerRef = useRef(null);
  const linkRefs = useRef([]);
  const ctaRef = useRef(null);
  const apiRef = useRef(null);

  linkRefs.current = [];

  const keep = mark && wordmark.indexOf(mark) === 0 ? mark : wordmark.charAt(0);
  const rest = wordmark.slice(keep.length);

  useImperativeHandle(ref, () => ({
    dock: () => apiRef.current && apiRef.current.dock(),
    undock: () => apiRef.current && apiRef.current.undock(),
    refresh: () => apiRef.current && apiRef.current.refresh(),
  }), []);

  const go = (event, href) => {
    if (onNavigate == null) return;
    event.preventDefault();
    onNavigate(href);
  };

  useGSAP(
    () => {
      const header = headerRef.current;
      const bg = bgRef.current;
      const nav = navRef.current;
      const logo = logoRef.current;
      const cta = ctaRef.current;
      const tailInner = tailInnerRef.current;
      const linkEls = linkRefs.current.filter(Boolean);
      if (!header || !bg || !nav || !logo || !cta) return undefined;

      // logo first, CTA last - measure() reads the row's ends from these slots
      const items = [logo].concat(linkEls, [cta]);

      let geo = null;
      let tl = null;
      let rmFade = null;
      let isDocked = false;
      let reducedMotion = false;
      let resizeTimer = null;
      let lastWidth = 0;
      let isReady = false;
      let disposed = false;
      let rafId = 0;

      function isShown(el) {
        return el.getClientRects().length > 0;
      }

      // Reads the top layout, then the docked layout (one synchronous class
      // swap, never painted), and turns the difference into transform deltas
      // plus the pill's clip geometry. Ratios of the real DOM, no typed px.
      function measure() {
        gsap.set(items.concat([nav]), { x: 0, y: 0 });
        const width = header.getBoundingClientRect().width;
        const barH = header.offsetHeight;
        const bgH = bg.offsetHeight;
        const tops = items.map((el) => el.getBoundingClientRect().left);

        header.classList.add(MEASURE_CLASS);
        const docks = items.map((el) => el.getBoundingClientRect());
        const ctaH = cta.offsetHeight;
        header.classList.remove(MEASURE_CLASS);

        const rowLeft = docks[0].left;
        const rowRight = docks[docks.length - 1].right;
        const pillW = rowRight - rowLeft + MARK_INSET + PILL_PAD;
        const pillH = ctaH + PILL_PAD * 2;
        const pillX = (width - pillW) / 2;
        const shift = pillX + MARK_INSET - rowLeft;

        return {
          dx: items.map((el, i) => (isShown(el) ? docks[i].left + shift - tops[i] : 0)),
          dy: offset + pillH / 2 - barH / 2,
          clipX: pillX,
          clipTop: offset,
          clipBottom: Math.max(0, bgH - offset - pillH),
          restBottom: Math.max(0, bgH - barH),
          radius: pillH / 2,
        };
      }

      function glassVars(p) {
        return {
          '--fnb-fill': GLASS_FILL * p,
          '--fnb-blur': GLASS_BLUR * p + 'px',
          '--fnb-sat': 1 + (GLASS_SAT - 1) * p,
        };
      }

      function dockSpecs() {
        const specs = [
          {
            target: bg, at: 0, dur: duration,
            from: { '--fnb-ct': '0px', '--fnb-cx': '0px', '--fnb-cb': geo.restBottom + 'px', '--fnb-cr': '0px' },
            to: { '--fnb-ct': geo.clipTop + 'px', '--fnb-cx': geo.clipX + 'px', '--fnb-cb': geo.clipBottom + 'px', '--fnb-cr': geo.radius + 'px' },
          },
          {
            target: bg, at: 0, dur: duration,
            from: glassVars(0), to: glassVars(1),
          },
          {
            target: logo, at: CONTENT_LAG, dur: duration,
            from: { x: 0 }, to: { x: geo.dx[0] },
          },
        ];
        if (tailInner) {
          specs.push({
            target: tailInner, at: CONTENT_LAG, dur: duration * FOLD_SCALE,
            from: { xPercent: 0, opacity: 1 }, to: { xPercent: -100, opacity: 0 },
          });
        }
        if (linkEls.length) {
          specs.push({
            target: linkEls, at: CONTENT_LAG, dur: duration,
            from: { x: 0 }, to: { x: (i) => geo.dx[1 + i] },
          });
        }
        specs.push(
          {
            target: cta, at: CONTENT_LAG, dur: duration,
            from: { x: 0 }, to: { x: geo.dx[items.length - 1] },
          },
          {
            target: nav, at: CONTENT_LAG, dur: duration * LIFT_SCALE,
            from: { y: 0 }, to: { y: geo.dy },
          }
        );
        return specs;
      }

      function buildTimeline() {
        tl = gsap.timeline({ paused: true });
        dockSpecs().forEach((spec) => {
          tl.fromTo(spec.target, spec.from, Object.assign({}, spec.to, {
            duration: spec.dur,
            ease,
            force3D: true,
            immediateRender: false,
            easeReverse: true,
          }), spec.at);
        });
      }

      function swapReduced(p) {
        tl.pause().progress(p);
        if (rmFade) rmFade.kill();
        rmFade = gsap.fromTo(bg, glassVars(1 - p), Object.assign(glassVars(p), {
          duration: RM_FADE,
          ease: 'power1.out',
        }));
      }

      function dock() {
        if (isDocked || !tl) return;
        isDocked = true;
        header.classList.add(DOCKED_CLASS);
        if (reducedMotion) swapReduced(1);
        else tl.play();
      }

      function undock() {
        if (!isDocked || !tl) return;
        isDocked = false;
        header.classList.remove(DOCKED_CLASS);
        if (reducedMotion) swapReduced(0);
        else tl.reverse();
      }

      // Renders a fresh timeline to a progress without playing it (1 first so
      // every child, delayed ones included, has rendered once).
      function setProgress(p) {
        tl.progress(1, true);
        if (p < 1) tl.progress(p, true);
      }

      // Measure -> build -> re-apply the CURRENT dock state (route-driven, so
      // unlike upstream there is no scroll position to restore from).
      function setup() {
        if (disposed) return;
        if (tl) tl.kill();
        if (rmFade) rmFade.kill();

        geo = measure();
        buildTimeline();
        lastWidth = header.getBoundingClientRect().width;
        setProgress(isDocked ? 1 : 0);
        header.classList.toggle(DOCKED_CLASS, isDocked);
      }

      function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          // height-only resizes (mobile URL bar) leave the geometry untouched
          if (header.getBoundingClientRect().width === lastWidth) return;
          setup();
        }, RESIZE_DEBOUNCE);
      }
      window.addEventListener('resize', handleResize);

      function handleVisibility() {
        if (document.hidden) gsap.globalTimeline.pause();
        else gsap.globalTimeline.resume();
      }
      document.addEventListener('visibilitychange', handleVisibility);

      const mm = gsap.matchMedia();
      mm.add({
        reduce: '(prefers-reduced-motion: reduce)',
        motion: '(prefers-reduced-motion: no-preference)',
      }, (ctx) => {
        reducedMotion = !!ctx.conditions.reduce;
        if (isReady) rafId = requestAnimationFrame(setup);
      });

      setup();
      isReady = true;
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => { setup(); });
      }

      apiRef.current = { dock, undock, refresh: setup };

      return () => {
        disposed = true;
        apiRef.current = null;
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibility);
        clearTimeout(resizeTimer);
        mm.revert();
        if (tl) tl.kill();
        if (rmFade) rmFade.kill();
        gsap.set([bg, nav, tailInner].concat(items).filter(Boolean), { clearProps: 'all' });
        header.classList.remove(DOCKED_CLASS);
      };
    },
    {
      scope: headerRef,
      dependencies: [duration, ease, offset, mark, wordmark, links.length],
      revertOnUpdate: true,
    }
  );

  return (
    <header ref={headerRef} className={`fnb_wrap${className ? ' ' + className : ''}`}>
      <div ref={bgRef} className="fnb_bg" aria-hidden="true" />

      <nav ref={navRef} className="fnb_nav" aria-label="Main">
        <a
          ref={logoRef}
          className="fnb_logo"
          href="/"
          aria-label={wordmark}
          onClick={(event) => go(event, '/')}
        >
          <span className="fnb_logo_text" aria-hidden="true">
            <span className="fnb_logo_mark">{keep}</span>
            {rest ? (
              <span className="fnb_logo_tail">
                <span ref={tailInnerRef} className="fnb_logo_tail_inner">{rest}</span>
              </span>
            ) : null}
          </span>
        </a>

        <ul className="fnb_links">
          {links.map((link, i) => (
            <li key={link.label} className="fnb_links_item">
              <a
                ref={(el) => { linkRefs.current[i] = el; }}
                className="fnb_link"
                data-current={currentPath === link.href ? '' : undefined}
                aria-current={currentPath === link.href ? 'page' : undefined}
                href={link.href || '#'}
                onClick={(event) => go(event, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          ref={ctaRef}
          className="fnb_cta"
          data-current={currentPath === ctaHref ? '' : undefined}
          href={ctaHref}
          onClick={(event) => go(event, ctaHref)}
        >
          {ctaLabel}
        </a>
      </nav>
    </header>
  );
});

export default FloatingNavbar;
