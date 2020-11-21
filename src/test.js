let SummarizerManager = require("node-summarizer").SummarizerManager;

let Summarizer = new SummarizerManager(
  "U.S. President Donald Trump sought to leverage the power of the Oval Office on Friday in an extraordinary attempt to block President-elect Joe Biden’s victory as criticism mounted that his futile efforts to subvert the results of the 2020 election could do long-lasting damage to democratic traditions.  Trump summoned a delegation of Republican lawmakers from Michigan, including the state’s Senate majority leader and House speaker, in an apparent extension of his efforts to persuade judges and election officials in the state to set aside Biden’s 154,000-vote margin of victory and grant him the state’s electors.",
  7
);
//let summary = Summarizer.getSummaryByFrequency().summary;
let reduction_percentage = Summarizer.getFrequencyReduction().reduction;
console.log(reduction_percentage);
