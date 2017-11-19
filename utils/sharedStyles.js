import { palette } from './palette';

export const sharedStyles = {
  borderBottom: {
    borderColor: 'transparent',
    borderBottomColor: palette.black,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    marginTop: 100,
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  heading: {
    paddingBottom: 15,
    fontWeight: 'bold',
    fontSize: 20,
  },
  icon: {
    width: 26,
    height: 26,
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topMargin: {
    marginTop: 30,
  },
}