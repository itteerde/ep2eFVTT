/**
 * It is not clear if anything can be gained by putting stuff in code compared to some paper and pen solution. The answer depends especially on how tightly the GM would like to control that Nanofabbing is done precisely, or at least not producing more than should be possible (so ensure the person/persons doing it is/are rounding down the output).
 * 
 * If the expectation towards prcecision is low and there is no control to check (in session) pen and paper is probably equal if not better than doing some low sophistication tool support -- while more sophisticated tools are hard to provide.
 * 
 * If we wamt the precision we could get from tool support we'd put the data into some Document within FVTT, which could probably be every Document a non-GM player would be given Ownership of. An Actor, why not their Character, would be the natural choice I believe. Reporting could still go into a JournalEntry. Though, if we want that, why not putting all the data into that as well? I think all Documents have the same functionality flags wise.
 * 
 * A major hurdle for tool support is that I believe that we'd might want to have all the items that might get printed in the database, which we don't get from the System. I am not sure about this however. It would be conceivable to add items into the queue with a simple ad hoc data structue, as simple as just providing name, complexity, number to be printed, and adding a starting time when printing starts. Reporting into ChatMessage would be far superior if we had proper data, but even then, we could not facilitate drag and drop from there.
 */
let printingHost = await fromUuid("");

let printingService = printingHost.getFlag("world", "printingService");
if (!printingService) {
    printingService = {
        fabbers: { smallFabbers: 0, mediumFabbers: 0, largeFabbers: 0, miniFacs: 0 },
        queue: [],
        jobsRunning: []
    };
}

/**
 * Add an amount of item to the printing queue. This is easy to get if we do it with ad hoc items, very much not so if we want to use a complete Gear database to pull the items from that.
 * 
 * @param {*} item 
 * @param {*} amount 
 */
function addPrintJob(item, amount) {

}

/**
 * Update the timing (from server time), and probable report items completed.
 */
function updateTime() {

}

/**
 * Report the status of the printing services, number of fabbers, jobs running with time remaining, queue and time expected for queue. I think it is not really possible to make this pretty for ChatMessage, but I do believe creating a proper report writing a JournalEntryPage would be easy enough.
 */
function report() {

}

async function reportBlueprints(database) {
    const crewHomePage = await fromUuid("JournalEntry.nvPwpZCN3IRuTwq2.JournalEntryPage.UF1YHNJk9JKjbUzP");
    if (!crewHomePage) {
        console.log("no crew home page found");
        return;
    }

    if (!database) {
        database = [
            {
                member: "Adrian Uve", blueprints: [
                    { name: "Armor Vest (Light)", pg: 214, complexity: { complexity: "Min", gp: 1, restricted: false }, size: "S" },
                    { name: "Medium Pistol (Firearm)", pg: 210, complexity: { complexity: "Min", gp: 1, restricted: true }, size: "S" },
                    { name: "Smart Clothing", pg: 317, complexity: { complexity: "Min", gp: 1, restricted: false }, size: "S" },
                    { name: "Enhanced Hearing", pg: 318, complexity: { complexity: "Min", pg: 1, restricted: false }, size: "VS" },
                    { name: "Guardian Angel", pg: 346, complexity: { complexity: "Mod", gp: 2, restricted: false }, size: "S" }
                ]
            },
            {
                member: "EGR_2.71828", blueprints: [

                ]
            }
        ];
    }

    await crewHomePage.setFlag("world", "blueprints", database);
    return database;
}
