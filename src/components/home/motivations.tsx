const text = {
    title: "Motivations",
    description:
        "Like a building, a website is made up of many different parts. The base determines the strength of the building. The same goes for a website. I use these technologies because they are the best in their field and will scale with the project needs.",
};

export default function Motivations() {
    return (
        <div className="m-4 flex flex-col items-center space-y-4">
            <div
                className="flex flex-col justify-center rounded-xl p-6 sm:h-72 sm:max-w-3xl"
                style={{
                    backgroundImage: "url('https://i.imgur.com/zoCJcf7.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.5)",
                }}
            >
                <h2 className="my-4 text-4xl font-bold">{text.title}</h2>
                <p className="text-xl font-medium">{text.description}</p>
            </div>
        </div>
    );
}
