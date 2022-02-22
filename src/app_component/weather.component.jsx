import React from 'react';
// import Dropdown from 'react-dropdown';


const Weather=(props)=>{
    var Image = `http://openweathermap.org/img/wn/${props.weathericon}@2x.png`;
    //console.log(Image);
    return(
        <div className='container text-light'>
            
            <div className="cards">
                {props.city ? (
                    <h1>{props.city},{props.country}</h1>
                ) : null}
                {props.weathericon ? (
                <h5 className="py-4">
                    <img src={Image} />
                </h5>
                ) : null}
                {props.temp_celsius ? (
                <h1 className="py-2">{props.temp_celsius}&deg;</h1>
                ) : null}

                {/* show max and min temp */}
                {maxminTemp(props.temp_min,props.temp_max)}
                <h4 className="py-3">
                    {props.description}
                </h4>
            </div>
            {/* <div>
            <select name="selectList" id="selectList">
              <option value="option 1">Option 1</option>
              <option value="option 2">Option 2</option>
            </select>
            </div> */}
        </div>
    );
};
function maxminTemp(min,max) {
  
    if (max && min) {
        return (
          <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
          </h3>
        );
    }
    
}

export default Weather;

