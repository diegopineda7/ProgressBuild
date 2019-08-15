import { StyleSheet } from 'react-native';

export default globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A73C07',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: "center"
  },
  image: {
    width: 120,
    height: 120
  },
  logoText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20
  },
  form: {
    width: '100%',
    padding: 30
  },
  item: {
    marginVertical: 15
  },
  label: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: -20
  },
  input: {
    color: '#fff',
    fontSize: 22
  },
  button: {
    backgroundColor: '#044417',
    height: 70,
    marginHorizontal: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  footer: {
    alignItems: 'center',
    marginTop: 20
  },
  touchableFooter: {
    backgroundColor: 'rgba(4, 68, 23, .5)',
    padding: 10,
    borderRadius: 20
  },
  footerText: {
    color: '#fff',
    fontSize: 22,
    paddingHorizontal: 10
  }
});