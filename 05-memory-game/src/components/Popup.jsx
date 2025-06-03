export function Popup({textDisplay, textButton, actionButton}) {
    return(     
        <div className="w-[100%] h-[100%] absolute top-0 left-0 bg-black/90 flex justify-center items-center">
            <div className="h-[300px] w-[500px] bg-black opacity-100 flex flex-col justify-center items-center rounded-lg">
                <h2 className="md:text-3xl font-bold text-2xl text-white">{textDisplay}</h2>
                <button onClick={() =>actionButton()} className="bg-white px-6 py-2 rounded-sm mt-4 cursor-pointer">{textButton}</button>
            </div>
        </div>
    )
}