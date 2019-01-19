
class AddPlanetForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {Name : "", RadiusPlanet : "", RadiusRotation : "", SpeedRotation : ""};

      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeRadiusPlanet = this.handleChangeRadiusPlanet.bind(this);
      this.handleChangeRadiusRotation = this.handleChangeRadiusRotation.bind(this);
      this.handleChangeSpeedRotation = this.handleChangeSpeedRotation.bind(this);
      this.AddPlanetToList = this.AddPlanetToList.bind(this);
      this.AddPlanetToList = this.AddPlanetToList.bind(this);
      this.ChangePlanetData = this.ChangePlanetData.bind(this);
        this.DeletePlanet = this.DeletePlanet.bind(this);

    }

    handleChangeName(event) {
      this.setState({Name: event.target.value});
    }
  
    handleChangeRadiusPlanet(event) {
        this.setState({RadiusPlanet: event.target.value});
      }

      handleChangeRadiusRotation(event) {
        this.setState({RadiusRotation: event.target.value});
      }

      handleChangeSpeedRotation(event) {
        this.setState({SpeedRotation: event.target.value});
      }

    AddPlanetToList(event) {
      var planet = {};
      planet.Name = this.state.Name;
      planet.RadiusPlanet = this.state.RadiusPlanet;
      planet.RadiusRotation = this.state.RadiusRotation;
      planet.SpeedRotation = this.state.SpeedRotation;
      planet.Satellites = [];
      localStorage.setItem('currentPlanet', this.state.Name);
      var arr = JSON.parse(localStorage.getItem("planets"));
      arr.push(planet);
      localStorage.setItem("planets", JSON.stringify(arr));

      this.props.updatePlanets(event);

      event.preventDefault();
    }


    ChangePlanetData(event){
        var planet = {};
        planet.Name = this.state.Name;
        planet.RadiusPlanet = this.state.RadiusPlanet;
        planet.RadiusRotation = this.state.RadiusRotation;
        planet.SpeedRotation = this.state.SpeedRotation;
        var arr = JSON.parse(localStorage.getItem("planets"));
        var currentPlanetName = localStorage.getItem("currentPlanet");
        var i = 0;
        for(; i < arr.length; i++){
            if(arr[i].Name == currentPlanetName){
                break;
            }
        }
        planet.Satellites = arr[i].Satellites;
        arr[i] = planet;

        localStorage.setItem("planets", JSON.stringify(arr));
        localStorage.setItem("currentPlanet", planet.Name);
        this.props.updatePlanets(event);
    }
  
    DeletePlanet(event){
        var planets = JSON.parse(localStorage.getItem('planets'));
        var currentPlanetName = localStorage.getItem("currentPlanet");
        var index = 0;

        planets = planets.filter((a) => a.Name != currentPlanetName);
        localStorage.setItem('planets', JSON.stringify(planets));
        this.props.updatePlanets(event);
    }

    render() {
      return (
        <div>

          <label>
            Name:
              <br/>
              <input type="text" value={this.state.Name} onChange={this.handleChangeName} />
          </label>
          <br/>
          <label>
            Radius planet:
              <br/>
            <input type="number" value={this.state.RadiusPlanet} onChange={this.handleChangeRadiusPlanet} />
          </label>
          <br/>
          <label>
            Radius rotation:
              <br/>
            <input type="number" value={this.state.RadiusRotation} onChange={this.handleChangeRadiusRotation} />
          </label>
          <br/>
          <label>
            Speed rotation:
              <br/>
            <input type="number" value={this.state.SpeedRotation} onChange={this.handleChangeSpeedRotation} />
          </label>
          <br/>
            <button onClick={this.AddPlanetToList}>Add</button>
            <button onClick={this.ChangePlanetData}>Change</button>
            <button onClick={this.DeletePlanet}>Delete</button>
        </div>
      );
    }
  }

  class AddSatelliteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Name : "", RadiusPlanet : "", RadiusRotation : "", SpeedRotation: ""};

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeRadiusPlanet = this.handleChangeRadiusPlanet.bind(this);
        this.handleChangeRadiusRotation = this.handleChangeRadiusRotation.bind(this);
        this.handleChangeSpeedRotation = this.handleChangeSpeedRotation.bind(this);
        this.AddSatellitesToList = this.AddSatellitesToList.bind(this);
        this.ChangeSatelliteData = this.ChangeSatelliteData.bind(this);
        this.DeleteSatellite = this.DeleteSatellite.bind(this);
      }
    
      handleChangeName(event) {
        this.setState({Name: event.target.value});
      }
      handleChangeRadiusPlanet(event) {
          this.setState({RadiusPlanet: event.target.value});
        }
  
        handleChangeRadiusRotation(event) {
          this.setState({RadiusRotation: event.target.value});
        }
  
        handleChangeSpeedRotation(event) {
          this.setState({SpeedRotation: event.target.value});
        }
  
      AddSatellitesToList(event) {
        try{
            var satellite = {};
            satellite.Name = this.state.Name;
            satellite.RadiusPlanet = this.state.RadiusPlanet;
            satellite.RadiusRotation = this.state.RadiusRotation;
            satellite.SpeedRotation = this.state.SpeedRotation;

            var currentPlanetName = localStorage.getItem('currentPlanet');
            if(!currentPlanetName) return;

            var planets = JSON.parse(localStorage.getItem('planets'));

            for(var i = 0; i < planets.length; i++){
                if(planets[i].Name == currentPlanetName){
                    planets[i].Satellites.push(satellite);
                    break;
                }
            }

            localStorage.setItem('planets', JSON.stringify(planets));
            localStorage.setItem('currentSatellite', currentPlanetName);
            this.props.updatePlanets(event);

            event.preventDefault();
        }
        catch(error){
            console.log(error);
        }
      }
  
      ChangeSatelliteData(event){
          var satellite = {};
          satellite.Name = this.state.Name;
          satellite.RadiusPlanet = this.state.RadiusPlanet;
          satellite.RadiusRotation = this.state.RadiusRotation;
          satellite.SpeedRotation = this.state.SpeedRotation;

          var currentPlanetName = localStorage.getItem('currentPlanet');
          if(currentPlanetName == null) return;
          var currentSatelliteName = localStorage.getItem('currentSatellite');


          var planets = JSON.parse(localStorage.getItem("planets"));



          for (var i = 0; i < planets.length; i++ )
          {
              if(planets[i].Name = currentPlanetName)
              {
                  for (var k = 0; k < planets[i].Satellites.length; k++)
                  {
                     if(planets[i].Satellites[k].Name == currentSatelliteName){
                         planets[i].Satellites[k] = satellite;
                         break;
                     }
                  }
                  break;
              }
          }

          localStorage.setItem("planets", JSON.stringify(planets));
          this.props.updatePlanets(event);
      }
    
      DeleteSatellite(event){

          var currentPlanetName = localStorage.getItem('currentPlanet');
          if(currentPlanetName == null) return;
          var currentSatelliteName = localStorage.getItem('currentSatellite');
          if(currentSatelliteName == null) return;

          var planets = JSON.parse(localStorage.getItem("planets"));

          for (var i = 0; i < planets.length; i++ )
          {
              if(planets[i].Name = currentPlanetName)
              {
                  for (var k = 0; k < planets[i].Satellites.length ; k++)
                  {
                      if(planets[i].Satellites[k].Name == currentSatelliteName){
                          planets[i].Satellites.splice(k, 1);
                          break;
                      }
                  }
                  break;
              }
          }

          localStorage.setItem("planets", JSON.stringify(planets));
          this.props.updatePlanets(event);
      }
  
      render() {
        return (
          <div>
            <label>
              Name:
                <br/>
              <input type="text" value={this.state.Name} onChange={this.handleChangeName} />
            </label>
            <br/>
            <label>
              Radius planet:
                <br/>
              <input type="number" value={this.state.RadiusPlanet} onChange={this.handleChangeRadiusPlanet} />
            </label>
            <br/>
            <label>
              Radius rotation:
                <br/>
              <input type="number" value={this.state.RadiusRotation} onChange={this.handleChangeRadiusRotation} />
            </label>
            <br/>
            <label>
              Speed rotation:
                <br/>
              <input type="number" value={this.state.SpeedRotation} onChange={this.handleChangeSpeedRotation} />
            </label>
            <br/>
              <button onClick={this.AddSatellitesToList}>Add</button>
              <button onClick={this.ChangeSatelliteData}>Change</button>
              <button onClick={this.DeleteSatellite}>Delete</button>
          </div>

        );
      }
  }

class App extends React.Component{
    constructor(props) {
        super(props);
        this.selectPlanet = this.selectPlanet.bind(this);
        this.selectSatellite = this.selectSatellite.bind(this);
        this.updatePlanets = this.updatePlanets.bind(this);
        this.state = {value: ''};

        var planets = [];
        var earth = {};
        earth.Name = "Earth";
        earth.RadiusPlanet = 100;
        earth.RadiusRotation = 300;
        earth.SpeedRotation = 4;
        earth.Satellites = [];
        var moon = {};
        moon.Name = "Moon";
        moon.RadiusPlanet = 30;
        moon.RadiusRotation = 50;
        moon.SpeedRotation = 2;
        earth.Satellites.push(moon);
        planets.push(earth);
        localStorage.setItem('planets', JSON.stringify(planets));
        localStorage.setItem('currentPlanet', "Earth");
      }

    updatePlanets(event){
       this.forceUpdate();
      }

    GetAllPlanets(){
        var planets = localStorage.getItem("planets");
        planets = JSON.parse(planets);
        var result = planets.map(
            (data) =>
            {
                return <div className = "subpanel" onClick={this.selectPlanet.bind(this)}>{data.Name}</div>
            });
        return result;
    }

    GetSatellitesForCurrentPlanet(){
        var currentPlanetName = localStorage.getItem("currentPlanet");
        var planets = localStorage.getItem("planets");
        planets = JSON.parse(planets);
        var result;
        for(var i = 0; i < planets.length; i++)
        {
            if(currentPlanetName == planets[i].Name && typeof planets[i].Satellites != "undefined"){
                result = planets[i].Satellites.map((data) => {return <div className = "subpanel" onClick={this.selectSatellite.bind(this)}>{data.Name}</div>});
            };
        }

        return result;
    }

    selectSatellite(event){
        localStorage.setItem("currentSatellite", event.target.textContent);
        this.forceUpdate();
    }
    selectPlanet(event){
        localStorage.setItem("currentPlanet", event.target.textContent);
        this.forceUpdate();
    }

    render(){
    return(
    <div>
        <div className="subpanel left_panel">
                <h1>Планеты</h1>
                {this.GetAllPlanets()}
                <div className="subpanel input_planet">
                <AddPlanetForm updatePlanets = {this.updatePlanets}></AddPlanetForm>
                </div>
            </div>
        <div className="middle_panel subpanel">
            <h1>Спутники</h1>
            {this.GetSatellitesForCurrentPlanet()}
             <div className="input_satellite subpanel">
                <AddSatelliteForm updatePlanets = {this.updatePlanets}></AddSatelliteForm>
            </div>
        </div>
        <Planets/>
    </div>
    )
    }
  }

  class Planets extends React.Component{
      constructor(props) {
          super(props);

          this.createPlanets = this.createPlanets.bind(this);
          this.createSatellites = this.createSatellites.bind(this);
          this.getStyleForPlanet = this.getStyleForPlanet.bind(this);
          this.getStyleForSatellite = this.getStyleForSatellite.bind(this);
      }

      createPlanets(){
          var planets = JSON.parse(localStorage.getItem("planets"));

          var result = planets.map((planet, planetIndex) => {
              return <div style = {this.getStyleForPlanet(planetIndex)} className="circle">
                        {this.createSatellites(planetIndex)}
                    </div>

          })

          return result;
      }

      createSatellites(planetIndex){
          var satellites = JSON.parse(localStorage.getItem("planets"))[planetIndex].Satellites;

          if(!satellites) return;

          return satellites.map((satellite, satelliteIndex) => {
              return <div style={this.getStyleForSatellite(planetIndex, satelliteIndex)} className="circle">
              </div>
          });
      }


      render(){
          return(
              <div className="right_panel subpanel" style ={{textAlign: "center"}}>
                <div className="universe">
                  <div className="sun circle">{this.createPlanets()}</div>
                </div>
              </div>
      )
      }

      getStyleForPlanet(planetIndex) {
          var planets = JSON.parse(localStorage.getItem("planets"));
          var myPlanet = planets[planetIndex];

          return {
              backgroundColor: "green",
          position: "relative",
          width: myPlanet.RadiusPlanet + "px",
          height: myPlanet.RadiusPlanet + "px",
          left: myPlanet.RadiusRotation + "px",
          animationDuration: myPlanet.SpeedRotation + "s",
          animationName: "rotate",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          transformOrigin: -myPlanet.RadiusRotation + "px",
          };
      }

      getStyleForSatellite(planetIndex, satelliteIndex) {
          var planets = JSON.parse(localStorage.getItem("planets"));
          var myPlanet = planets[planetIndex].Satellites[satelliteIndex];
          var planet = planets[planetIndex];

          return {
              backgroundColor: "blue",
          position: "relative",

              width: myPlanet.RadiusPlanet + "px",
              height: myPlanet.RadiusPlanet + "px",
              left: planet.RadiusPlanet/3 + planet.RadiusPlanet/2 + myPlanet.RadiusRotation + "px",
              top: planet.RadiusPlanet/3 + "px",
              animationDuration: myPlanet.SpeedRotation + "s",
          animationName: "backwadrs-rotate",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          // transformOrigin: -myPlanet.RadiusRotation + "px",
          };
      }
  }

  ReactDOM.render(
      <App />,
      document.getElementById('root')
  );
