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
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'greys.2',
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
    top: '5rem',
    left: 0,
    right: 0,
    boxShadow: 'small',
    borderRadius: 'medium',
  },
  item: {
    py: 2,
    px: 3,
  },
  highlighted: {
    bg: 'greys.0',
  },
  selected: {
    color: 'primary',
  },
}

export default defaultStyles
