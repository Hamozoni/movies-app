

const PersonStitistics = ({details}) => {
  return (
    <section className="person-stitis">
        <nav className="pers-stit-nav">

        </nav>
        <h4>personal info</h4>
        <section className="personal-info">
            <p>
                <strong>Known For</strong>
                {details?.known_for_department}
            </p>
            <p>
                <strong>Known Credits</strong>
                {details?.popularity}
            </p>
            <p>
                <strong>Gender</strong>
                {details?.gender === 1 ? "femal" : "male" }
            </p>
            <p>
                <strong>Birthday</strong>
                {details?.birthday}
            </p>
            <p>
                <strong>Place of Birth</strong>
                {details?.birthday}
            </p>
        </section>
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
