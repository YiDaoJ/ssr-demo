import { createMuiTheme } from 'material-ui/styles'
import { blue } from 'material-ui/colors'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    inherit: blue[300]
  }
})

export default theme