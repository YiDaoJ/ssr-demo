import React from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography/Typography';
import Divider from 'material-ui/Divider';


const Dashboard = ({
  onCreateProjectClick,
  onDeleteProjectClick,
  onUpdateProjectClick,
  onUpdateProjectClick2,
  ...props}) => {

  const { allProjects } = props
  // console.log(allProjects)
  // console.log(JSON.stringify(allProjects, undefined, 2))

  return (
    <div style={{width: "100%", height: "100%", overflow:"scroll" }}>
      <div style={{backgroundColor: "#F5F5F5", width: "100%", height: "70%", overflow:"scroll", marginBottom: 30, padding: 15 }}>
      <Typography>All Projects</Typography>
        <ul>{ allProjects && allProjects.map((proj, i) => <li key={i}>{proj['_id']}</li>) }</ul>
        <Divider />
        <pre style={{ fontSize: 14,
                      width: "80vw",
                      margin: "10px auto",
                      lineHeight: '2vh',
                      fontFamily: 'Roboto, sans-serif'
                      }}>
          { JSON.stringify(allProjects, undefined, 4) }
          <br/>
        </pre>
      </div>
      <div className="btnGroup">
        <Button raised color="primary" onClick={onCreateProjectClick}> Add new Project</Button> {'\t'}
        <Button raised color="inherit" onClick={onDeleteProjectClick}> Delete Project</Button>
        <Divider style={{margin: '20px auto'}} />
        <Button raised onClick={onUpdateProjectClick}>Update: add data Item</Button>{'\t'}
        <Button raised onClick={onUpdateProjectClick2}>Update: add data Item 2</Button>{'\t'}
        {/* <Button raised >Update 2</Button>{'\t'}
        <Button raised >Update 3</Button> */}
      </div>
    </div>
  );
};

export default Dashboard;