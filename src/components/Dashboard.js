import React from 'react';
import Button from 'material-ui/Button'

const Dashboard = ({onCreateProjectClick, ...props}) => {

  const { allProjects } = props
  // console.log(allProjects)
  console.log(JSON.stringify(allProjects, undefined, 2))

  return (
    <div style={{width: "100%", height: "100%", overflow:"scroll" }}>
      <div style={{backgroundColor: "#F5F5F5", width: "100%", height: "auto", overflow:"scroll", marginBottom: 30, padding: 15 }}>
        { allProjects && allProjects.map((proj, i) => <li key={i}>{proj['_id']}</li>) }
        <div style={{ width: "100%", margin: "10px auto" }}>
          { JSON.stringify(allProjects, null, "\t") }
        </div>
      </div>
      <div className="btnGroup">
        <Button raised color="primary" onClick={onCreateProjectClick}> Add new Project</Button>
      </div>

    </div>
  );
};

export default Dashboard;