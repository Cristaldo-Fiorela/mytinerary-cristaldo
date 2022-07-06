
function Activities(activities) {

const allActivities = activities

    return(
        <>
        {allActivities.activities.map( activity => 
            <div key={activity._id}>
                <p>{activity.activitiesName}</p>
                <img src={activity.activitiesPhotos} alt="activity itinerary" />
            </div>
        )}
        </>
    )
}

export default Activities