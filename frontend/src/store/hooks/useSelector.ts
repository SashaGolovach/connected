import { useSelector as useSelectorUntyped } from 'react-redux';

import { IStore } from '../../typings';

type TUseSelector = <TSelected>(
  selector: (state: IStore) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected;

export const useSelector: TUseSelector = useSelectorUntyped;
