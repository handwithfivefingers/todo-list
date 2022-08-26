import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import AuthenticateService from './../../service/authenticate.service';
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

export { useAuthenticate, useFetch };
