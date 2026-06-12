import { useSelector } from 'react-redux'
import Header from './Header'
import useMovieLists from '../customHooks/useMovieLists';
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import GPTsearch from './GPTsearch'


const Browse = () => {


  //  useEffect(()=>{
  //   callMovieSuggestion();        
  // },[])


  const gptToggle = useSelector(store => store.gpt.showGpt)


  useMovieLists();

 
  return (
    <div className="bg-black min-h-screen">
      <Header></Header>
      {gptToggle ? <GPTsearch /> : (<><MainContainer /><SecondaryContainer /></>)}
    </div>
  )
}

export default Browse
