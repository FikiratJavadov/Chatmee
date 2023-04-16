'use client';

import {
  RequestWithSenderAndRecipients,
  useRequest,
} from '@/zustand/request-store';
import { FC, useRef } from 'react';

const StoreClientLoader = ({
  requests,
}: {
  requests: RequestWithSenderAndRecipients[];
}) => {
  const initilizer = useRef(false);

  if (!initilizer.current) {
    useRequest.setState({ requests: requests });
    initilizer.current = true;
  }

  return null;
};

export default StoreClientLoader;
