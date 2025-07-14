import { createSelector } from 'reselect'

// Picks the entire emailList slice from global state
const selectEmailDomain = (state) => state.emailList

export const selectEmails = createSelector(
  [selectEmailDomain],
  (substate) => substate.emails    
)

export const makeSelectEmailById = (id) => {
  console.log("the id is", id)
  return createSelector(
    [selectEmails],
    (emails) => emails.find(email => email.id === id)
  )
}



export const selectLoading = createSelector(
  [selectEmailDomain],
  (substate) => substate.loading
)


