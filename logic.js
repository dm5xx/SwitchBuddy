function initTable()
{
	let table = document.getElementById("table1");

	for(let a=0; a < 16; a++)
	{
		let row = table.insertRow(a);

		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);
		let cell4 = row.insertCell(3);		
		
		if(buttonBank1ON[a].Blocked == 0)
			cell1.innerHTML = "<a id=\"buttonBank1On_"+buttonBank1ON[a].ID+"\" class=\"button\" href=\"#\" onClick=\"callUrl("+buttonBank1ON[a].ID+","+buttonBank1ON[a].Bank+","+buttonBank1ON[a].Function+")\">"+buttonBank1ON[a].Text+"</a>";
		else
			cell1.innerHTML = "<a id=\"buttonBank1On_"+buttonBank1ON[a].ID+"\" class=\"buttonBlack\" href=\"#\" onClick=\"alert('Disabled!')\">"+buttonBank1ON[a].Text+"</a>";

		if(buttonBank1OFF[a].Blocked == 0)
			cell2.innerHTML = "<a id=\"buttonBank1Off_"+buttonBank1OFF[a].ID+"\" class=\"button2\" href=\"#\" onClick=\"callUrl("+buttonBank1OFF[a].ID+","+buttonBank1OFF[a].Bank+","+buttonBank1OFF[a].Function+")\">"+buttonBank1OFF[a].Text+"</a>";
		else
			cell2.innerHTML = "<a id=\"buttonBank1Off_"+buttonBank1OFF[a].ID+"\" class=\"buttonBlack\" href=\"#\" onClick=\"alert('Disabled!')\">"+buttonBank1OFF[a].Text+"</a>";

		if(enableSecondBank)
		{
			if(buttonBank2ON[a].Blocked == 0)
				cell3.innerHTML = "<a id=\"buttonBank2On_"+buttonBank2ON[a].ID+"\" class=\"button3\" href=\"#\" onClick=\"callUrl("+buttonBank2ON[a].ID+","+buttonBank2ON[a].Bank+","+buttonBank2ON[a].Function+")\">"+buttonBank2ON[a].Text+"</a>";
			else	
				cell3.innerHTML = "<a id=\"buttonBank2On_"+buttonBank2ON[a].ID+"\" class=\"buttonBlack\" href=\"#\" onClick=\"alert('Disabled!')\">"+buttonBank2ON[a].Text+"</a>";

			if(buttonBank2OFF[a].Blocked == 0)
				cell4.innerHTML = "<a id=\"buttonBank2Off_"+buttonBank2OFF[a].ID+"\" class=\"button2\" href=\"#\" onClick=\"callUrl("+buttonBank2OFF[a].ID+","+buttonBank2OFF[a].Bank+","+buttonBank2OFF[a].Function+")\">"+buttonBank2OFF[a].Text+"</a>";
			else
				cell4.innerHTML = "<a id=\"buttonBank2Off_"+buttonBank2OFF[a].ID+"\" class=\"buttonBlack\" href=\"#\" onClick=\"alert('Disabled!')\">"+buttonBank2OFF[a].Text+"</a>";		
		}
	}
};

function callUrl(id, bank, thefunction)
{
	console.log("Called ID: " + id + " on bank number " + bank + " with function " + thefunction);	
	
	let item = {};

	let onItemById = {};
	let offItemById =  {};

	let elementOn = document.getElementById('buttonBank1On_'+id);
	let elementOff = document.getElementById('buttonBank1Off_'+id);
	
	if(bank == 0)
	{

		onItemById = buttonBank1ON[id-1];
		offItemById = buttonBank1OFF[id-1];
				
		if(thefunction == 0)
		{			
			off1Commands[id-1] = 1;
			on1Commands[id-1] = 0;			
			
			if(onItemById.Blocked == 0)
				elementOn.className = "button";
			
			elementOff.className = "buttonRed";			
			item = offItemById;
			
			if(offItemById.ResetCssIDs != undefined && offItemById.ResetCssIDs.length > 0)
			{
				for(let i=0; i < offItemById.ResetCssIDs.length; i++)
				{
					let currentElement = document.getElementById('buttonBank1Off_'+offItemById.ResetCssIDs[i]);
					
					if(buttonBank1OFF[i].Blocked == 0)
						ResetColor(currentElement, "button2", offItemById.ResetCssTime);
						
					if(offItemById.ResetCssOnAllOnOff != undefined && offItemById.ResetCssOnAllOnOff == 1)
					{
						let currentElementOn = document.getElementById('buttonBank1On_'+offItemById.ResetCssIDs[i]);

						if(buttonBank1ON[i].Blocked == 0)
							ResetColor(currentElementOn, "button", offItemById.ResetCssTime);
					}
					
					if(offItemById.ResetCssOnAllBanks != undefined && offItemById.ResetCssOnAllBanks == 1)
					{
						let currentElementOn = document.getElementById('buttonBank2On_'+offItemById.ResetCssIDs[i]);
						let currentElementOff = document.getElementById('buttonBank2Off_'+offItemById.ResetCssIDs[i]);

						if(buttonBank2ON[i].Blocked == 0)
							ResetColor(currentElementOn, "button3", offItemById.ResetCssTime);

						if(buttonBank2OFF[i].Blocked == 0)
							ResetColor(currentElementOff, "button2", offItemById.ResetCssTime);
					
					}
				}
			}
			
			item = offItemById;
		}
		else
		{
			off1Commands[id-1] = 0;
			on1Commands[id-1] = 1;	

			if(offItemById.Blocked == 0)
				elementOff.className = "button2";

			elementOn.className = "buttonRed";
			
			if(onItemById.ResetCssIDs != undefined && onItemById.ResetCssIDs.length > 0)
			{
				for(let i=0; i < onItemById.ResetCssIDs.length; i++)
				{
					let currentElement = document.getElementById('buttonBank1On_'+onItemById.ResetCssIDs[i]);
					
					if(buttonBank1ON[i].Blocked == 0)
						ResetColor(currentElement, "button", onItemById.ResetCssTime);
						
					if(onItemById.ResetCssOnAllOnOff != undefined && onItemById.ResetCssOnAllOnOff == 1)
					{
						let currentElementOn = document.getElementById('buttonBank1Off_'+onItemById.ResetCssIDs[i]);

						if(buttonBank1OFF[i].Blocked == 0)
							ResetColor(currentElementOn, "button2", onItemById.ResetCssTime);
					}
					
					if(offItemById.ResetCssOnAllBanks != undefined && offItemById.ResetCssOnAllBanks == 1)
					{
						let currentElementOn = document.getElementById('buttonBank2On_'+offItemById.ResetCssIDs[i]);
						let currentElementOff = document.getElementById('buttonBank2Off_'+offItemById.ResetCssIDs[i]);

						if(buttonBank2ON[i].Blocked == 0)
							ResetColor(currentElementOn, "button3", offItemById.ResetCssTime);

						if(buttonBank2OFF[i].Blocked == 0)
							ResetColor(currentElementOff, "button2", offItemById.ResetCssTime);
					
					}
				}
			}

			item = onItemById;
		}		
	}
	else
	{
		let elementOn = document.getElementById('buttonBank2On_'+id);
		let elementOff = document.getElementById('buttonBank2Off_'+id);

		onItemById = buttonBank2ON[id-1];
		offItemById = buttonBank2OFF[id-1];

		if(thefunction == 0)
		{			
			off2Commands[id-1] = 1;
			on2Commands[id-1] = 0;
						
			if(onItemById.Blocked == 0)
				elementOn.className = "button3";
			
			elementOff.className = "buttonRed";
			

			if(offItemById.ResetCssIDs != undefined && offItemById.ResetCssIDs.length > 0)
			{
				for(let i=0; i < offItemById.ResetCssIDs.length; i++)
				{
					let currentElement = document.getElementById('buttonBank2Off_'+offItemById.ResetCssIDs[i]);
					
					if(buttonBank2OFF[i].Blocked == 0)
						ResetColor(currentElement, "button2", offItemById.ResetCssTime);
						
					if(offItemById.ResetCssOnAllOnOff != undefined && offItemById.ResetCssOnAllOnOff == 1)
					{
						let currentElementOn = document.getElementById('buttonBank2On_'+offItemById.ResetCssIDs[i]);

						if(buttonBank2ON[i].Blocked == 0)
							ResetColor(currentElementOn, "button3", offItemById.ResetCssTime);
					}
					
					if(offItemById.ResetCssOnAllBanks != undefined && offItemById.ResetCssOnAllBanks == 1)
					{
						let currentElementOn = document.getElementById('buttonBank1On_'+offItemById.ResetCssIDs[i]);
						let currentElementOff = document.getElementById('buttonBank1Off_'+offItemById.ResetCssIDs[i]);

						if(buttonBank1ON[i].Blocked == 0)
							ResetColor(currentElementOn, "button", offItemById.ResetCssTime);

						if(buttonBank1OFF[i].Blocked == 0)
							ResetColor(currentElementOff, "button2", offItemById.ResetCssTime);
					
					}

				}
			}

			item = offItemById;
		}
		else
		{
			off2Commands[id-1] = 0;
			on2Commands[id-1] = 1;	

			elementOn.className = "buttonRed";

			if(offItemById.Blocked == 0)
				elementOff.className = "button2";

			if(onItemById.ResetCssIDs != undefined && onItemById.ResetCssIDs.length > 0)
			{
				for(let i=0; i < onItemById.ResetCssIDs.length; i++)
				{
					let currentElement = document.getElementById('buttonBank2On_'+onItemById.ResetCssIDs[i]);
					
					if(buttonBank2ON[i].Blocked == 0)
						ResetColor(currentElement, "button3", onItemById.ResetCssTime);
						
					if(onItemById.ResetCssOnAllOnOff != undefined && onItemById.ResetCssOnAllOnOff == 1)
					{
						let currentElementOn = document.getElementById('buttonBank2Off_'+onItemById.ResetCssIDs[i]);

						if(buttonBank2OFF[i].Blocked == 0)
							ResetColor(currentElementOn, "button2", onItemById.ResetCssTime);
					}
					
					if(offItemById.ResetCssOnAllBanks != undefined && offItemById.ResetCssOnAllBanks == 1)
					{
						let currentElementOn = document.getElementById('buttonBank1On_'+offItemById.ResetCssIDs[i]);
						let currentElementOff = document.getElementById('buttonBank1Off_'+offItemById.ResetCssIDs[i]);

						if(buttonBank1ON[i].Blocked == 0)
							ResetColor(currentElementOn, "button", offItemById.ResetCssTime);

						if(buttonBank1OFF[i].Blocked == 0)
							ResetColor(currentElementOff, "button2", offItemById.ResetCssTime);					
					}
				}
			}

			item = onItemById;
		}
	}	
	callUrlBackground(item.Commands);
};

function callUrlBackground(commands) {

	for(let i=0; i < commands.length; i++)
	{	
		if(commands[i].Delay == 0)
			callFetch(commands[i].URL);
		else
			window.setTimeout(callFetch.bind(null, commands[i].URL), commands[i].Delay);
	}
}

function callFetch(url)
{
	console.log("Calling this url: " + url);

	var headers = {}

	fetch(url, {
		method : "GET",
		mode: 'cors',
		headers: headers
	})
	.then((response) => {
		if (!response.ok) {
			throw new Error(response.error)
		}
		console.log("Success");
	})
	.catch(function(error) {
		console.log("Failed");
	});
}

function ResetColor(elementName, classname, offsetTime)
{
	window.setTimeout(ResetCssTo.bind(null, elementName, classname), offsetTime * 1000);
}

function ResetCssTo(elementName, classname)
{
	console.log("ElementName to Reset: "+elementName + " to class " + classname);
	elementName.className = classname;
}