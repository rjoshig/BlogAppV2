import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme, Appbar, Avatar } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Header({ scene, previous, navigation }) {
  const theme = useTheme()
  const { options } = scene.descriptor

  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {previous ? (
        <Appbar.BackAction onPress={navigation.goBack} color={theme.colors.primary} />
      ) : (
        <Appbar.Action
          icon="menu"
          size={24}
          color={theme.colors.primary}
          onPress={() => {
            navigation.openDrawer()
          }}
        />
      )}
      <Appbar.Content
        title={
          title === 'Home' ? (
            <MaterialCommunityIcons style={{ marginRight: 10 }} color={theme.colors.primary} name="twitter" size={40} />
          ) : (
            title
          )
        }
        titleStyle={{
          fontSize: 14,
          fontWeight: 'bold',
          color: theme.colors.primary,
        }}
      />
    </Appbar.Header>
  )
}

// const styles = StyleSheet.create({
//   appbar: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     marginTop: 20,
//   },
// })
// style={{ marginLeft: 10 }}
// onPress={() => {
//   ((navigation as any) as DrawerNavigationProp<{}>).openDrawer();

// <Appbar.Content
// title={previous ? title : <MaterialCommunityIcons color={theme.colors.primary} name="twitter" size={24} />}
// />
