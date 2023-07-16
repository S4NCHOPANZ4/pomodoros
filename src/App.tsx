import Home from "./pages/Home"
import './stlye/main.scss'

function App() {

  const goToLink = (link: string) =>{
    window.open(link, '_blank');
  }

  return (
    <>
      <Home />
      <div className="body_super">
        <p className="general_title">
          An online Pomodoro Timer to boost your productivity!
        </p>
        <p className="body_title">
        What is Pomofocus?
        </p>
        <p className="body_text">
        Pomofocus is a customizable pomodoro timer that works on the browser. 
        The aim of this app is to help you focus on any task you are working on, such as study, 
        writing, or coding. This app is inspired by <span className="body_link" onClick={()=>{
        goToLink('https://francescocirillo.com/products/the-pomodoro-technique')}}>Pomodoro Technique</span>  which is a time management
        method developed by Francesco Cirillo.
        </p>
        <p className="body_title">
        What is Pomodoro Technique?
        </p>
        <p className="body_text">
        The Pomodoro Technique is created by Francesco Cirillo for a more productive way to work and study.
         The technique uses a timer to break down work into intervals,
        traditionally 25 minutes in length, separated by short breaks.
        Each interval is known as a pomodoro, from the Italian word for 'tomato',
        after the tomato-shaped 
        kitchen timer that Cirillo used as a university student. - <span className="body_link" onClick={()=>{
        goToLink('https://en.wikipedia.org/wiki/Pomodoro_Technique')}}> Wikipedia</span>
        </p>
        <p className="body_title">
        How to use the Pomodoro Timer?
        </p>
        <ol className="body_list">
          <li><span className="list_title">Add tasks</span> to work on today</li>
          <li><span className="list_title">Set estimate pomodoros</span> (1 = 25min of work) for each tasks</li>
          <li><span className="list_title">Select a task</span> to work on</li>
          <li><span className="list_title">Start timer</span> and focus on the task for 25 minutes</li>
          <li><span className="list_title">Take a break</span> for 5 minutes when the alarm ring</li>
          <li><span className="list_title">Iterate</span> 3-5 until you finish the tasks</li>
        </ol>
      </div>
      <div className="footer_super">
          <p>Developed by <span >Juan Buitrago</span></p>
          <p>Cloned and inspired from<span onClick={()=>{
            goToLink('https://pomofocus.io')
          }}> Pomofocus</span></p>
      </div>
    </>
  )
}

export default App
