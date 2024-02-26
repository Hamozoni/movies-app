
import "./PersonStitistics.scss";

const PersonStitistics = ({details}) => {
  return (
    <section className="person-stitis">
        <nav className="pers-stit-nav">

        </nav>
        <h3>personal info</h3>
        <ul className="personal-info">
            <li>
                <h4>Known For</h4>
                <h6>{details?.known_for_department}</h6>
            </li>
            <li>
                <h4>Known Credits</h4>
                <h6> {details?.popularity}</h6>
            </li>
            <li>
                <h4>Gender</h4>
                <h6>{details?.gender === 1 ? "femal" : "male" }</h6>
            </li>
            <li>
                <h4>Birthday</h4>
                <h6> {details?.birthday}</h6>
            </li>
            <li>
                <h4>Place of Birth</h4>
               <h6> {details?.birthday}</h6>
            </li>
        </ul>
        <section className="kn-for">
            <h4>known for</h4>
            <ul>
                {
                    details?.also_known_as?.map((key)=>(
                        <li key={key}>{key}</li>
                    ))
                }
            </ul>
        </section>
    </section>
  )
}

export default PersonStitistics
