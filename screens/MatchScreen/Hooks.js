import { useState } from 'react-native'

function hooks() {
  const [modal, setModal] = useState(false)
  const [match, setMatch] = useState()
  const [admin, setAdmin] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [playersContainer, setPlayersContainer] = useState()
  const [container, setContainer] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [admins, setAdmins] = useState([])
  const [selector, setSelector] = useState()
  const [mode, setMode] = useState('')

  const handleModal = status => {
    setModal(status)
  }

  const handleMatch = m => {
    setMatch(m)
  }

  const handleAdmin = a => {
    setAdmin(a)
  }

  const handleForm = submitting => {
    setIsSubmitting(submitting)
  }

  const handleContainerPlayer = pcontainer => {
    setPlayersContainer(pcontainer)
  }

  return {
    modal,
    match,
    admin,
    isSubmitting,
    playersContainer,
    handleModal,
    handleMatch,
    handleAdmin,
    handleForm,
    handleContainerPlayer,
  }
}

export default hooks
