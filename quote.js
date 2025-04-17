const quotes = [
    'i do not think therefore i do not am',
    'There is an art, it says, or rather, a knack of flying.  The knack lies in learning how to throw yourself at the grown and miss. – Hitchhiker’s Guide to the Galaxy',
    'In the beginning the Universe was created.  This has made a lot of people very angry and been widely regarded as a bad move. – Hitchhiker’s Guide to the Galaxy',
    'Grab a seat but trust me, you’re only going to need the edge. – Ted Mosby',
    'There is considerable overlap between the intelligence of the smartest bears and the dumbest tourists – A park ranger',
    '"Funny," he intoned funereally, "how just when you think life can’t possibly get any worse it suddenly does."',
    'It is a mistake to think you can solve any major problems just with potatoes. – Hitchhiker’s Guide to the Galaxy',
    'That’s the funny thing about arriving somewhere, Vin... Once you’re there, the only thing you can really do is leave again. – Kelsier',
    'People’s memories are maybe the fuel they burn to stay alive. – Haruki Murakami',
    'I’m not afraid of death. It’s the stake one puts up in order to play the game of life. – Jean Girraudoux',
    'Can you carry a luminary while insulted? – Andarna',
    'I chose you not as my next but as my last, and should you fall, then I will follow. – Tairn',
    'The work is mysterious and important',
    'Please enjoy each design equally',
    'The earth is littered with ruins of the empires that once believed they were eternal. – Camille Paglia'
]



$(".footer_section_quote").text(quotes[Math.floor(Math.random() * quotes.length)]);