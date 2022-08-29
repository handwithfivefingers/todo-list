import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import AuthenticateService from './../../service/authenticate.service';
import { useDomEvent, useMotionValue, useInvertedScale } from 'framer-motion/dist/framer-motion.dev';
import { spring , mix} from 'popmotion/dist/popmotion';
import { debounce } from 'lodash';

const useAuthenticate = (props) => {
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props?.isLogin) {
      setState(props?.isLogin);
    } else {
      checkAuthenticate();
    }
  }, []);

  const checkAuthenticate = async () => {
    try {
      setLoading(true);
      let res = await AuthenticateService.Authenticate();
      if (res.status === 200) {
        setState(true);
      } else {
        setState(false);
      }
    } catch (err) {
      console.log(err);
      setState(false);
    } finally {
      setLoading(false);
    }
  };

  return { isLogin: state, loading };
};

const useFetch = ({
  cacheName,
  fn,
  path,
  staleTime = 60 * 1000,
  refetchOnWindowFocus = true,
  otherPath,
}) => {
  const { data, isFetching, isLoading, status, refetch } = useQuery(
    cacheName,
    async () => {
      let res = await fn();
      let result;
      result = res.data;
      return result;
    },
    {
      staleTime, // 1 minute
      refetchOnWindowFocus,
    }
  );

  return { data, isLoading, status, refetch, isFetching };
};

/**
 * Avoid the stretch/squashing of border radius by using inverting them
 * throughout the component's layout transition.
 *
 * It would be possible to animate to/from different radius, for instance
 * in mobile mode from rounded to square for full-screen panels, by passing
 * the calculated inverted transform to `layoutTransition` when set as a function.
 *
 * Those inverted scales could be provided here to act as a `from` value,
 * then we can use Popcorn's `mix` function to get our
 *
 * @param radius
 */
const useInvertedBorderRadius = (radius) => {
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  const inverted = useInvertedScale({ scaleX, scaleY });
  const borderRadius = useMotionValue(`${radius}px`);

  useEffect(() => {
    function updateRadius() {
      const latestX = inverted.scaleX.get();
      const latestY = inverted.scaleY.get();
      const xRadius = latestX * radius + 'px';
      const yRadius = latestY * radius + 'px';

      borderRadius.set(`${xRadius} ${yRadius}`);
    }

    const unsubScaleX = inverted.scaleX.onChange(updateRadius);
    const unsubScaleY = inverted.scaleY.onChange(updateRadius);

    return () => {
      unsubScaleX();
      unsubScaleY();
    };
  }, [radius]);

  return {
    scaleX,
    scaleY,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  };
};

const useScrollConstraints = (ref, measureConstraints) => {
  const [constraints, setConstraints] = useState({
    top: 0,
    bottom: 0,
  });

  useEffect(() => {
    if (!measureConstraints) return;

    const element = ref.current;
    const viewportHeight = window.innerHeight;
    const contentTop = element.offsetTop;
    const contentHeight = element.offsetHeight;
    const scrollableViewport = viewportHeight - contentTop * 2;
    const top = Math.min(scrollableViewport - contentHeight, 0);

    setConstraints({ top, bottom: 0 });
  }, [measureConstraints]);

  return constraints;
};

// Absolute distance a wheel scroll event can travel outside of
// the defined constraints before we fire a "snap back" animation
const deltaThreshold = 5;

// If wheel event fires beyond constraints, multiple the delta by this amount
const elasticFactor = 0.2;

const springTo = (value, from, to) => {
  if (value.isAnimating()) return;

  value.start((complete) => {
    const animation = spring({
      from,
      to,
      velocity: value.getVelocity(),
      stiffness: 400,
      damping: 40,
    }).start({
      update: (v) => value.set(v),
      complete,
    });

    return () => animation.stop();
  });
};

const debouncedSpringTo = debounce(springTo, 100);

/**
 * Re-implements wheel scroll for overlflow: hidden elements.
 *
 * Adds Apple Watch crown-style constraints, where the user
 * must continue to input wheel events of a certain delta at a certain
 * speed or the scrollable container will spring back to the nearest
 * constraint.
 *
 * Currently achieves this using event.deltaY and a debounce, which
 * feels pretty good during direct input but it'd be better to increase
 * the deltaY threshold during momentum scroll.
 *
 * TODOs before inclusion in Framer Motion:
 * - Detect momentum scroll and increase delta threshold before spring
 * - Remove padding hack
 * - Handle x-axis
 * - Perhaps handle arrow and space keyboard events?
 *
 * @param ref - Ref of the Element to attach listener to
 * @param y - MotionValue for the scrollable element - might be different to the Element
 * @param constraints - top/bottom scroll constraints in pixels.
 * @param isActive - `true` if this listener should fire.
 */
const useWheelScroll = (ref, y, constraints, onWheelCallback, isActive) => {
  const onWheel = (event) => {
    event.preventDefault();

    const currentY = y.get();
    let newY = currentY - event.deltaY;
    let startedAnimation = false;
    const isWithinBounds =
      constraints && newY >= constraints.top && newY <= constraints.bottom;

    if (constraints && !isWithinBounds) {
      newY = mix(currentY, newY, elasticFactor);

      if (newY < constraints.top) {
        if (event.deltaY <= deltaThreshold) {
          springTo(y, newY, constraints.top);
          startedAnimation = true;
        } else {
          debouncedSpringTo(y, newY, constraints.top);
        }
      }

      if (newY > constraints.bottom) {
        if (event.deltaY >= -deltaThreshold) {
          springTo(y, newY, constraints.bottom);
          startedAnimation = true;
        } else {
          debouncedSpringTo(y, newY, constraints.bottom);
        }
      }
    }

    if (!startedAnimation) {
      y.stop();
      y.set(newY);
    } else {
      debouncedSpringTo.cancel();
    }

    onWheelCallback(event);
  };

  useDomEvent(ref, 'wheel', isActive && onWheel, { passive: false });
};

export {
  useAuthenticate,
  useFetch,
  useInvertedBorderRadius,
  useScrollConstraints,
  useWheelScroll
};
