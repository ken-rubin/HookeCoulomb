////////////////////////////////////
// WRC Portal application entry.
//

"use strict";

// Define application global error handler.
window.reportError = (e) => {

		try {

			// Just get the element and set its inner text.
			const divError = document.getElementById("ErrorDiv");
			let strText = "";
			if (e) {

				strText = e.message;
				divError.classList.add("ContentLikeBorder");
			} else {

				divError.classList.remove("ContentLikeBorder");
			}
			divError.innerText = strText;
		} catch (eInner) {

			// Last resort, an alert:
			alert(`Failed to report error: ${e.message}, because: ${eInner.message}.`);
		}
	};

// Wire DOMContentLoaded event.
document.addEventListener("DOMContentLoaded", () => {

	try {

        // Configure canvas.
        const canvas = document.getElementById("Canvas");
        canvas.width = 640;
        canvas.height = 480;

        // Get context for canvas.
        const context = canvas.getContext("2d");

        // Set up nodes.
        const nodeA = new Node();
        const nodeB = new Node();
        const nodeC = new Node();
        const nodeD = new Node();
        const nodeE = new Node();

        const arrayNodes = [nodeA,
            nodeB,
            nodeC,
            nodeD,
            nodeE];

        nodeA.color = "white";
        nodeB.color = "green";
        nodeC.color = "blue";
        nodeD.color = "yellow";
        nodeE.color = "magenta";
        nodeE.mass = 0.1;
        nodeE.charge = 0.1;
        nodeE.radius = 10;

        let dMagnitude = 300;
        nodeA.position = {

            x: Math.random() * 2 * dMagnitude - dMagnitude,
            y: Math.random() * 2 * dMagnitude - dMagnitude
        };
        nodeB.position = {

            x: Math.random() * 2 * dMagnitude - dMagnitude,
            y: Math.random() * 2 * dMagnitude - dMagnitude
        };
        nodeC.position = {

            x: Math.random() * 2 * dMagnitude - dMagnitude,
            y: Math.random() * 2 * dMagnitude - dMagnitude
        };
        nodeD.position = {

            x: Math.random() * 2 * dMagnitude - dMagnitude,
            y: Math.random() * 2 * dMagnitude - dMagnitude
        };
        nodeE.position = {

            x: Math.random() * 2 * dMagnitude - dMagnitude,
            y: Math.random() * 2 * dMagnitude - dMagnitude
        };

        nodeA.hookeChildren.push(nodeB);
        nodeA.hookeChildren.push(nodeC);
        nodeA.hookeChildren.push(nodeD);
        nodeB.hookeChildren.push(nodeA);
        nodeB.hookeChildren.push(nodeC);
        nodeB.hookeChildren.push(nodeD);
        nodeC.hookeChildren.push(nodeA);
        nodeC.hookeChildren.push(nodeB);
        nodeC.hookeChildren.push(nodeD);
        nodeD.hookeChildren.push(nodeA);
        nodeD.hookeChildren.push(nodeB);
        nodeD.hookeChildren.push(nodeC);
        nodeD.hookeChildren.push(nodeE);
        nodeE.hookeChildren.push(nodeD);

        nodeA.coulombChildren.push(nodeB);
        nodeA.coulombChildren.push(nodeC);
        nodeA.coulombChildren.push(nodeD);
        nodeA.coulombChildren.push(nodeE);
        nodeB.coulombChildren.push(nodeA);
        nodeB.coulombChildren.push(nodeC);
        nodeB.coulombChildren.push(nodeD);
        nodeB.coulombChildren.push(nodeE);
        nodeC.coulombChildren.push(nodeA);
        nodeC.coulombChildren.push(nodeB);
        nodeC.coulombChildren.push(nodeD);
        nodeC.coulombChildren.push(nodeE);
        nodeD.coulombChildren.push(nodeA);
        nodeD.coulombChildren.push(nodeB);
        nodeD.coulombChildren.push(nodeC);
        nodeD.coulombChildren.push(nodeE);
        nodeE.coulombChildren.push(nodeA);
        nodeE.coulombChildren.push(nodeB);
        nodeE.coulombChildren.push(nodeC);
        nodeE.coulombChildren.push(nodeD);

        // Position Cartesian: {0, 0}, at center of Canvas.
        context.translate(canvas.width / 2,
            canvas.height / 2);

        // Save date of last render so each render can scale its speed smoothly.
        let dateLastRender = new Date();
        const functionAnimate = () => {

            // Compute frame time.

            // Get seconds for this frame and update timer.
            let dFrameMilliseconds = (new Date() - dateLastRender);
            dateLastRender = new Date();

            // Compute the nodes net force.
            arrayNodes.forEach((nodeChild) => {

                nodeChild.computeNetForce();
            });

            // Adjust positions....
            arrayNodes.forEach((nodeChild) => {

                nodeChild.computePosition(dFrameMilliseconds / 1000.0);
            });

            // Clear the frame.
            context.clearRect(-canvas.width / 2,
                -canvas.height  /2,
                canvas.width,
                canvas.height);

            // Render the nodes.
            arrayNodes.forEach((nodeChild) => {

                nodeChild.render(context,
                    nodeA);
            });

            // Do it again.
            window.requestAnimationFrame(functionAnimate);
        };

        // Start the animation sequence.
        window.requestAnimationFrame(functionAnimate);
    } catch (e) {

        window.reportError(e);
    }
});
