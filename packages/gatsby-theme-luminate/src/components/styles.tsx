export interface IStyles {
  root: object
  field: object
  label: object
  menu: object
  item: object
  highlighted: object
  selected: object
}

const defaultStyles: IStyles = {
  root: {
    position: 'relative',
  },
  label: {},
  field: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    p: 2,
    color: 'inherit',
    bg: 'inherit',
    border: '1px solid black',
    borderRadius: 'small',
    textTransform: 'inherit',
    '&:hover': {bg: 'inherit', color: 'inherit'},
  },
  menu: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    margin: 0,
    padding: 0,
    maxHeight: 250,
    overflowY: 'auto',
    bg: 'white',
    listStyleType: 'none',
    top: 5,
    left: 0,
    right: 0,
    boxShadow: 'medium',
    borderRadius: 'medium',
  },
  item: {
    py: 2,
    px: 3,
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',
  },
  highlighted: {
    color: 'primary',
  },
  selected: {
    borderLeftColor: 'primary',
  },
}

export default defaultStyles
