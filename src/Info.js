


function Info(props){
  return (
    <div>
      <div className='info'>
        <div className='location'>{props.location}</div>
        <div className='date'>{props.date}  </div>
      </div>

      <div className='temp'>
        <div className='temp-degree'>{props.temp} °C </div>
        <div className='temp-icon'>
          <img className='icon' src={props.iconUrl} />
        </div>
        <div className='temp-descr'>
          {props.descr}
        </div>

      </div>
    </div>
  )
}

export default Info;
