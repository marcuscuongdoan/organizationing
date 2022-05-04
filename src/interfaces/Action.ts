export interface Action {
  revert?: () => void;
  action: () => void;
}
