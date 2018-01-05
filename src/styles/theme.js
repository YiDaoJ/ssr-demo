import { createMuiTheme } from 'material-ui/styles'
import { blue, orange, deepOrange, amber } from 'material-ui/colors'

const theme = createMuiTheme({
  palette: {
    primary: amber,
    inherit: blue[300]
  }
})

export default theme