let profile = document.getElementById("home") 
let settings = document.getElementById("settings")

profile.addEventListener("click", userProfile)
settings.addEventListener("click", userSettings)

function userProfile()
{
  
  let userTab = document.getElementById('settings') //settings tab 
  userTab.className = "list-group-item list-group-item-action"
  
  let tab = document.getElementById('list-settings') //settings content
  tab.className = "tab-pane fade"

  let maptab = document.getElementById('home') //Profile tab
  maptab.className = maptab.className + ' active'

  let showProfile = document.getElementById('list-home') //Profile content
  showProfile.className = showProfile.className + ' active'


}

function userSettings(){
  
  let changeProfileSettings = document.getElementById('home')
  changeProfileSettings.className = "list-group-item list-group-item-action"
  
  let changeShowProfile = document.getElementById('list-home')
  changeShowProfile.className = "tab-pane fade show"

  let userSettingsChange = document.getElementById('settings')
  userSettingsChange.className = userSettingsChange.className + ' active'
  
  let userTab = document.getElementById('list-settings')
  userTab.className = userTab.className + 'show active'
}