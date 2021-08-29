import React, {useEffect,useState} from 'react';
import {BrowserRouter as Router , Link, Route , Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from './SearchForm';


const Newsfeed = () => {
    const [articles,setArticles] = useState([])
    const [term,setTerm]=useState('everything')
    const [isLoading,setIsLoading] =useState(true)


    useEffect(() => {
        const fetchArticles =async () => {
        try {
            
                const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=ggkUrBknehqvmmdXT5Xzm409A4UwEQhd`
                )
                const articles= await res.json()
                console.log(articles.response.docs);

                setArticles(articles.response.docs)
            

        }catch(error) {
            console.error(error);
        }
        
        }
    
        fetchArticles()


    },[term])





    return (
        <>
        <div className="showcase">
            <div className="overlay px-5">
                <h1 className="text-1xl font-bold text-gray text-center mb-4 lg:text-6xl">Viewing Articles about...{term}</h1>
                <SearchForm searchText={(text) => setTerm(text)}/>
            </div>

        </div>

      


        <section className ="cont">
            {articles.map((article) => {
                const {abstract,headline:{main},byline:{original},image,lead_paragraph,news_desk,section_name,web_url,_id,word_count} = article


                return (
                   <article key ={_id} className="contone">
                       <h2 className ="font-bold text-2xl mb-5 ">{main}</h2>
                       <p>{abstract}</p>
                       <p>lead_paragraph</p>

                       <ul className ="my-4">
                           <li>{original}</li>
                           <li><span className="font-bold">News Desk:</span>{news_desk}</li>
                           <li><span className="font-bold">Section Name:</span>{section_name}</li>
                           <li><span className="font-bold">Word Count:</span>{word_count}</li>
                       </ul>
                       <a href ={web_url} target="_blank" className ="underline">Web Resource</a>

                   </article>
                )
            })}
        </section>
      


            {/*https://jsonplaceholder.typicode.com/posts   https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey    ggkUrBknehqvmmdXT5Xzm409A4UwEQhd*/}
        </>
    )
}
export default Newsfeed