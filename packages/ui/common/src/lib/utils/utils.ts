import { ActionType, TriggerType, isNil } from '@activepieces/shared';
import { PieceProperty, PropertyType } from '@activepieces/pieces-framework';

export function getDisplayNameForTrigger(triggerType: TriggerType) {
  switch (triggerType) {
    case TriggerType.EMPTY: {
      return $localize`Empty Trigger`;
    }
  }
  return $localize`Trigger`;
}

export function getDefaultDisplayNameForPiece(
  pieceType: ActionType,
  pieceName: string
) {
  switch (pieceType) {
    case ActionType.CODE: {
      return $localize`Code`;
    }
    case ActionType.LOOP_ON_ITEMS: {
      return $localize`Loop on Items`;
    }
    case ActionType.PIECE: {
      return pieceName;
    }
    case ActionType.BRANCH: {
      return $localize`Branch`;
    }
  }
}

export function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

export const getPropertyInitialValue = (
  property: PieceProperty,
  currentValue: unknown
) => {
  if (isNil(currentValue)) {
    //used for default values for dynamic property inputs like in custom api calls
    return parseControlValue(property, property.defaultValue);
  }
  return parseControlValue(property, currentValue);
};

const parseControlValue = (property: PieceProperty, value: unknown) => {
  switch (property.type) {
    case PropertyType.SHORT_TEXT:
    case PropertyType.LONG_TEXT:
    case PropertyType.NUMBER:
    case PropertyType.DATE_TIME:
    case PropertyType.FILE:
      return isNil(value)
        ? ''
        : typeof value === 'string'
        ? value
        : JSON.stringify(value);
    case PropertyType.ARRAY:
      return isNil(value) ? [] : value;
    case PropertyType.OBJECT:
    case PropertyType.DYNAMIC:
      return isNil(value) ? {} : value;
    case PropertyType.CHECKBOX:
      return isNil(value) ? false : value;
    case PropertyType.MARKDOWN:
      return undefined;
    case PropertyType.BASIC_AUTH:
    case PropertyType.CUSTOM_AUTH:
    case PropertyType.OAUTH2:
    case PropertyType.SECRET_TEXT:
    case PropertyType.DROPDOWN:
    case PropertyType.STATIC_DROPDOWN:
    case PropertyType.MULTI_SELECT_DROPDOWN:
    case PropertyType.STATIC_MULTI_SELECT_DROPDOWN:
      return isNil(value) ? '' : value;
    //json value is returned as either an object or string from the server
    case PropertyType.JSON:
      return isNil(value)
        ? property.required
          ? '{}'
          : ''
        : typeof value === 'string'
        ? value
        : JSON.stringify(value);
  }
};
