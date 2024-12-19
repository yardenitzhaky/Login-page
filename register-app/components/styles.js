import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#4355B9',
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  username: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  inputIcon: {
    marginRight: 10,
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    color: '#4355B9',
    textAlign: 'right',
  },
  button: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4355B9',
    paddingHorizontal: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4355B9',
  },
  buttonOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4355B9',
  },
  buttonDisabled: {
    backgroundColor: '#B4BEE6',
    borderColor: '#B4BEE6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextOutline: {
    color: '#333',
  },
  buttonIcon: {
    marginRight: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  socialButton: {
    width: '48%',
  },
  footer: {
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    color: '#666',
  },
  registerButton: {
    width: '100%',
  },
  loginButton: {
    width: '100%',
},
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default styles;
