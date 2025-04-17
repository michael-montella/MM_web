const quotes = [
    {   
        quote: 'i do not think therefore i do not am',
        source: ''
    },
    {
        quote: 'There is an art, it says, or rather, a knack of flying.  The knack lies in learning how to throw yourself at the grown and miss.',
        source: 'Douglas Adams'
    },
    {
        quote: 'In the beginning the Universe was created.  This has made a lot of people very angry and been widely regarded as a bad move.',
        source: 'Douglas Adams'
    },
    {
        quote: 'Grab a seat but trust me, you’re only going to need the edge.',
        source: 'Ted Mosby'
    },

    {
        quote: 'There is considerable overlap between the intelligence of the smartest bears and the dumbest tourists.',
        source: 'A park ranger'
    },
    {
        quote: '"Funny," he intoned funereally, "how just when you think life can’t possibly get any worse it suddenly does."',
        source: 'Douglas Adams'
    },
    {
        quote: 'It is a mistake to think you can solve any major problems just with potatoes.',
        source: 'Douglas Adams'
    },
    {
        quote: 'That’s the funny thing about arriving somewhere, Vin... Once you’re there, the only thing you can really do is leave again.',
        source: 'Kelsier'
    },
    {
        quote: 'People’s memories are maybe the fuel they burn to stay alive.',
        source: 'Haruki Murakami'
    },
    {
        quote: 'I’m not afraid of death. It’s the stake one puts up in order to play the game of life.',
        source: 'Jean Girraudoux'
    },
    {
        quote: 'Can you carry a luminary while insulted?',
        source: 'Andarna'
    },
    {
        quote: 'I chose you not as my next but as my last, and should you fall, then I will follow.',
        source: 'Tairn'
    },
    {
        quote:'The work is mysterious and important',
        source: ''
    },
    {
        quote: 'Please enjoy each design equally',
        source: ''
    },
    {
        quote: 'The earth is littered with ruins of the empires that once believed they were eternal.',
        source: 'Camille Paglia'
    },
    {
        quote: 'If you don’t learn to find joy in the snow, you’ll have less joy in your life and precisely the same amount of snow.',
        source: 'James Sexton'
    },
    {
        quote: 'Tradition is just peer pressure from dead people.',
        source: 'James Sexton'
    },
    {
        quote: 'The person who discovered water probably wasn’t a fish.',
        source: 'James Sexton'
    },
    {
        quote: 'I’ve been trying to hangboard every other day, and it’s the other day.',
        source: 'Alex Honnold'
    },
    {
        quote: 'not happy with how wasteful coffee pods are but i roll my own joints instead of buying pre-rolls so it cancels out',
        source: ''
    },
]


let index = quotes[Math.floor(Math.random() * quotes.length)]
$(".footer_section_quote").text(index.quote)
$(".footer_section_source").text(`– ${index.source}`)