import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false)

  async function getMealsFromDB(){
    let getMealsList = []
    setIsLoading(true)

    const response = await axios.get("https://react-hooks-c25a3-default-rtdb.europe-west1.firebasedatabase.app/meals.json")
    .then(res => {

      for(let m in res.data){
        getMealsList.push({
          id: res.data[m].id,
          name: res.data[m].name,
          description: res.data[m].description,
          price: res.data[m].price
        })
      }
    })
    .catch(error => {
      alert("Oooops, smothening went wrong.")
      console.log(error)
      setIsFailed(true)
    })
    setMeals(getMealsList)
    setIsLoading(false)
  }

  useEffect(() => {
    getMealsFromDB()
  }, []);

  if(isLoading){
    return <section className={classes.MealsLoading}>Loading...</section>
  }

  if(isFailed){
    return <section className={classes.MealsLoading}>Failed to fetch meals.</section>
  }

  const mealsList = meals.map(m => 
    <MealItem 
    key={m.id} 
    id={m.id}
    name={m.name} 
    description={m.description} 
    price={m.price}/>
  )

    return(
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )

}

export default AvailableMeals;