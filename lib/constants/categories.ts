import { 
  MdHotel, 
  MdRestaurant, 
  MdLocalCafe, 
  MdFlight, 
  MdAccountBalance, 
  MdLocalHospital, 
  MdBusiness, 
  MdPhoneInTalk, 
  MdWork, 
  MdMoreHoriz 
} from 'react-icons/md'

export const CATEGORIES = [
  { value: 'hotels', label: 'Hotels', icon: MdHotel },
  { value: 'restaurants', label: 'Restaurants', icon: MdRestaurant },
  { value: 'cafes', label: 'Cafés', icon: MdLocalCafe },
  { value: 'tourism', label: 'Tourism', icon: MdFlight },
  { value: 'banks', label: 'Banks', icon: MdAccountBalance },
  { value: 'hospitals', label: 'Hospitals', icon: MdLocalHospital },
  { value: 'government', label: 'Government Services', icon: MdBusiness },
  { value: 'telecommunications', label: 'Telecommunications', icon: MdPhoneInTalk },
  { value: 'professional', label: 'Professional Services', icon: MdWork },
  { value: 'other', label: 'Other', icon: MdMoreHoriz },
]

export const RATING_CATEGORIES = [
  {
    key: 'entrance',
    label: 'Entrance',
    question: 'How were you welcomed?',
    description: 'First impressions, greeting, reception'
  },
  {
    key: 'interaction',
    label: 'Interaction',
    question: 'How helpful and responsive was the staff?',
    description: 'Staff attentiveness, communication, assistance'
  },
  {
    key: 'heart_factor',
    label: 'Heart Factor',
    question: 'Did the service feel genuinely warm and attentive?',
    description: 'Warmth, empathy, personal touch'
  },
  {
    key: 'responsiveness',
    label: 'Responsiveness',
    question: 'How quickly were your needs addressed?',
    description: 'Speed, efficiency, timeliness'
  },
  {
    key: 'problem_resolution',
    label: 'Problem Resolution',
    question: 'If you had a problem, how well was it handled?',
    description: 'Issue handling, problem solving'
  },
  {
    key: 'exit',
    label: 'Exit',
    question: 'How was the final interaction?',
    description: 'Closing service, farewell, follow-up'
  },
]
