import { useDispatch as useDispatchUntyped } from 'react-redux';

import { IDispatch } from '../../typings';

export const useDispatch: () => IDispatch = useDispatchUntyped;
