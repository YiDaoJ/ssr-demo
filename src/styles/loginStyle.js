const LoginStyle = {
  loginCard: {
    display: 'block',
    margin: 'auto',
    width: 550,
    height: 500
  },

  loginCardContent: {
    margin: '0 auto',
    align: 'center',
    width: '70%',
    padding: 0,
    height: 380
  },

  cardTitle: {
    padding: 0,
    height: 140,
    width: '100%'
  },

  inputField: {
    display: 'block',
    marginTop: '30px'
  },

  cardAction: {
    margin: '0 auto',
    padding: 0,
    justifyContent: 'space-between',
    width: '70%'
  },

  loginBtn: {
    width: '25%',
    height: 40
  },

  errorMessage: {
    fontSize: '14px',
    color: '#FF8F00',
    fontWeight: 'bold'
  },

  forgotPWLink: {
    textDecoration: 'none',
    color: '#FFF !important'
  },

  afterInput: {
    '&:after': {
      backgroundColor: '#FF8F00'
    }
  },

  // ================ forgot password ================
  forgotPWCard: {
    display: 'block',
    margin: '0 auto',
    transform: 'translateY(-80px)',
    width: 700,
    height: 360
  },

  forgotPWCardContent: {
    margin: '0 auto',
    align: 'center',
    width: '70%',
    padding: 0,
    height: 280
  },

  forgotPWCardAction: {
    display: 'block',
    width: '70%',
    margin: '0 auto',
    padding: 0,
    textAlign: 'right'
  },

  // ================ reset password ================
  resetPWCard: {
    display: 'block',
    margin: '0 auto',
    transform: 'translateY(-80px)',
    width: 600,
    height: 400
  },

  resetPWCardContent: {
    margin: '0 auto',
    align: 'center',
    width: '70%',
    padding: 0,
    height: 320
  }

}

export default LoginStyle
