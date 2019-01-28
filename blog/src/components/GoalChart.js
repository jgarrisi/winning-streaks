import { 
    LineChart,   
    XAxis,
    YAxis,
    Legend,
    Line,
    Tooltip 
} from 'recharts';
import React from 'react'
import moment from 'moment'
import _ from 'lodash'

class GoalChart extends React.Component {


    render() {
        
      const { posts } = this.props
      const colors = [
          'red',
          'blue',
          'turquoise',
          'green',
      ]

      let newPosts = _.sortBy(posts, [function(o) { return o.date; }]);
      newPosts = newPosts.map(post=>{
          const newPost = post
          newPost.dateMoment = moment(newPost.date)
          newPost.dateUnix = newPost.dateMoment.unix()
          newPost.bedtimeMoment = moment(newPost.date + ' ' + newPost.bedtime, 'YYYY-MM-DD HH:mm')
          newPost.bedtimeUnix = newPost.bedtimeMoment.unix()
          newPost.bedtimeSeconds = newPost.bedtimeMoment.diff(newPost.dateMoment)
          newPost.eveningbrushstreak = 0;
          newPost.morningbrushstreak = 0;
          newPost.exercisedstreak = 0;
          return newPost
      })
      newPosts.forEach((post, i) => {
          const yesterdaysEveningBrushStreak = newPosts[i-1] ? newPosts[i-1].eveningbrushstreak : 0
          const yesterdaysMorningBrushStreak = newPosts[i-1] ? newPosts[i-1].morningbrushstreak : 0
          const yesterdaysexercisedstreak = newPosts[i-1] ? newPosts[i-1].exercisedstreak : 0

          if(post.eveningbrush) {
              post.eveningbrushstreak = yesterdaysEveningBrushStreak + 1
          } else {
              post.eveningbrushstreak = 0
          }

          if(post.morningbrush) {
              post.morningbrushstreak = yesterdaysMorningBrushStreak + 1
          } else {
              post.morningbrushstreak = 0
          }

            if(post.exercised) {
                post.exercisedstreak = yesterdaysexercisedstreak + 1
            } else {
                post.exercisedstreak = 0
            }
      })
      
      
  
      return (
        <LineChart width={800} height={400} margin={{ top: 5, right: 0, bottom: 0, left: 50 }} data={newPosts}>
            <XAxis         
                dataKey = 'date'
                tickFormatter = {(unixTime) => moment(unixTime).format('MMM-DD')}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36}/>
            <YAxis 
                yAxisId='right'
                orientation='right'
                dataKey = 'bedtimeSeconds' 
                name = 'bedtime'   
                tickFormatter = {(unixTime) => moment.utc(unixTime).format('HH:mm')}
                stroke={colors[0]}
                domain={[65000000, 90000000]}
            />
            <Line 
                name='Bed Time'
                yAxisId='right'
                type="monotone" 
                dataKey="bedtimeSeconds" 
                stroke={colors[0]}
            />
            <YAxis
                yAxisId='left'
                dataKey = 'eveningbrushstreak' 
                name = 'bedtime'   
            />
            <Line 
                name='Evening Brush'
                yAxisId='left'
                type="monotone" 
                dataKey="eveningbrushstreak" 
                stroke={colors[1]}
            />
            <Line 
                name='Morning Brush'
                yAxisId='left'
                type="monotone" 
                dataKey="morningbrushstreak" 
                stroke={colors[3]}
            />
            <Line 
                name='Exercise Daily'
                yAxisId='left'
                type="monotone" 
                dataKey="exercisedstreak" 
                stroke={colors[4]}
            />
        </LineChart>
      )
    }
  }
  
export default GoalChart