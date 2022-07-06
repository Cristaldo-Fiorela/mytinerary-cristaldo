
function Activities(activities) {

const allActivities = activities

    return(
        <>
        {allActivities.activities.map( activity => 
            <div key={activity._id} className='activityContainer'>
                <p className="activityName">{activity.activitiesName}</p>
                <img className="activityImage" src={activity.activitiesPhotos} alt="activity itinerary" />
            </div>
        )}
        </>
    )
}

export default Activities