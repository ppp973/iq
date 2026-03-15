'use client';

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Heart, Play } from "lucide-react";
import coursesData from "@/data/courses.json";

export default function Home() {

const [query,setQuery] = useState("");
const [visible,setVisible] = useState(12);
const [favorites,setFavorites] = useState([]);

const sorted = useMemo(()=>{
 return [...coursesData].sort((a,b)=> Number(b.id)-Number(a.id))
},[]);

const filtered = sorted.filter(c =>
 c.title.toLowerCase().includes(query.toLowerCase()) ||
 c.id.toString().includes(query)
);

const toggleFav=(id,e)=>{
 e.preventDefault();
 const newFav = favorites.includes(id)
  ? favorites.filter(f=>f!==id)
  : [...favorites,id];

 setFavorites(newFav);
 localStorage.setItem("vip_favs",JSON.stringify(newFav));
};

useEffect(()=>{
 const saved = localStorage.getItem("vip_favs");
 if(saved) setFavorites(JSON.parse(saved));
},[]);

return(

<div className="min-h-screen bg-black text-white">

{/* HERO */}

<section className="pt-32 text-center">

<h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
VIP Study
</h1>

<p className="text-zinc-400 mb-10">
Explore thousands of premium batches
</p>

{/* SEARCH */}

<div className="max-w-xl mx-auto relative">

<Search className="absolute left-4 top-4 text-zinc-500"/>

<input
type="text"
placeholder="Search batches..."
className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500"
onChange={(e)=>setQuery(e.target.value)}
/>

</div>

</section>

{/* COURSE GRID */}

<section className="max-w-7xl mx-auto px-6 mt-20">

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

{filtered.slice(0,visible).map(course=>(

<motion.div
key={course.id}
whileHover={{scale:1.05}}
className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800"
>

<div className="relative h-44">

<Image
src="/mybatches.png"
alt={course.title}
fill
className="object-cover"
/>

<button
onClick={(e)=>toggleFav(course.id,e)}
className="absolute top-3 right-3"
>
<Heart
className={`w-5 h-5 ${
favorites.includes(course.id)
?"text-red-500 fill-red-500":"text-white"
}`}
/>
</button>

</div>

<div className="p-5">

<h3 className="font-bold line-clamp-2 mb-4">
{course.title}
</h3>

<Link href={`/course/${course.id}`}>

<button className="w-full bg-indigo-500 py-3 rounded-xl flex items-center justify-center gap-2 font-bold">
<Play size={16}/>
Start Learning
</button>

</Link>

</div>

</motion.div>

))}

</div>

{/* LOAD MORE */}

{filtered.length>visible &&(

<div className="text-center mt-16">

<button
onClick={()=>setVisible(v=>v+12)}
className="bg-zinc-800 px-8 py-4 rounded-xl"
>
Load More
</button>

</div>

)}

</section>

</div>

)

}
