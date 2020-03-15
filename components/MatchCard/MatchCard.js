import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { Icon, Image } from 'react-native-elements'
import TextC from '../customContainers/TextC'
import Styles from './Styles'

const BottomItem = ({ texto, color = 'white' }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TextC
        style={{
          color,
          fontWeight: 'bold',
          fontSize: hp('1.8%'),
        }}
      >
        {texto}
      </TextC>
    </View>
  )
}

const MatchCard = ({ match, userUID, assist, noassist, element }) => {
  return (
    <View style={[Styles.container, Styles.cardMatch, element === 0 && { marginTop: 100 }]}>
      <View style={Styles.topSection}>
        <View style={Styles.imageContainer}>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={{
              uri: match && match.imageMatch,
            }}
          />
        </View>
        <View style={Styles.infoContainer}>
          <View style={Styles.topInfo}>
            <TextC style={Styles.title}>{match.name}</TextC>
            <TextC>{match.description}</TextC>
            <TextC>{match.place}</TextC>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[Styles.dateTimeContainer, { marginRight: 10 }]}>
              <Icon
                iconStyle={{ marginRight: 5 }}
                name="calendar"
                type="font-awesome"
                color="black"
                size={15}
              />
              <TextC>{match.date}</TextC>
            </View>
            <View style={Styles.dateTimeContainer}>
              <Icon
                iconStyle={{ marginRight: 5 }}
                name="clock-o"
                type="font-awesome"
                color="black"
                size={15}
              />
              <TextC>{match.time}</TextC>
            </View>
          </View>
        </View>
      </View>
      <View style={Styles.bottomSection}>
        <View
          style={[
            Styles.bottomItem,
            { backgroundColor: '#4eaa4c', justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <BottomItem texto={match.assistance || 0} color="white" />
        </View>
        <TouchableOpacity onPress={() => assist()}>
          <View
            style={[
              Styles.bottomItem,
              match.participation[userUID] ? Styles.bottomAssist : Styles.bottomAssistActive,
              { justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            <TextC style={{ color: 'white', fontWeight: 'bold', fontSize: hp('1.3%') }}>
              Asistir
            </TextC>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => noassist()}>
          <View
            style={[
              Styles.bottomItem,
              !match.participation[userUID] ? Styles.bottomNoAssist : Styles.bottomNoAssistActive,

              { justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            <TextC style={{ color: 'white', fontWeight: 'bold', fontSize: hp('1.3%') }}>
              No asistir
            </TextC>
          </View>
        </TouchableOpacity>
        <View
          style={[
            Styles.bottomItem,
            { backgroundColor: '#CC1034', justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <BottomItem texto={match.players.length - match.assistance || 0} color="white" />
        </View>
      </View>
    </View>
  )
}

export default MatchCard
