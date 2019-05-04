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
        const nodeDataElement = new Node();
        const nodeValueDomain = new Node();
        const nodeDataElementConcept = new Node();
        const nodeRepresentation = new Node();
        const nodeValue = new Node();
        const nodeProperty = new Node();
        const nodeObjectClass = new Node();

        const arrayNodes = [nodeDataElement,
            nodeValueDomain,
            nodeDataElementConcept,
            nodeRepresentation,
            nodeValue,
            nodeProperty,
            nodeObjectClass];

        let dMagnitude = 100;
        arrayNodes.forEach((nodeParent) => {

            nodeParent.position = {

                x: Math.random() * 2 * dMagnitude - dMagnitude,
                y: Math.random() * 2 * dMagnitude - dMagnitude
            };

            nodeParent.coulombChildren = arrayNodes.filter((nodeChild) => {
                return (nodeChild != nodeParent); });
        });

        nodeProperty.color = "rgba(0,72,72,0.5)";
        nodeProperty.name = "property";
        nodeProperty.charge = 7;

        nodeObjectClass.color = "rgba(72,72,0,0.5)";
        nodeObjectClass.name = "object_class";
        nodeObjectClass.charge = 7;

        nodeDataElementConcept.color = "rgba(0,0,100,0.5)";
        nodeDataElementConcept.name = "data_element_concept";
        nodeDataElementConcept.radius = 25;

        nodeValue.color = "rgba(72,0,72,0.5)";
        nodeValue.name = "value";
        nodeValue.vertical = true;
        nodeValue.radius = 10;

        nodeRepresentation.color = "rgba(57,57,57,0.5)";
        nodeRepresentation.name = "representation";

        nodeValueDomain.color = "rgba(0,100,0,0.5)";
        nodeValueDomain.name = "value_domain";
        nodeValueDomain.radius = 25;

        nodeDataElement.color = "rgba(100,0,0,0.5)";
        nodeDataElement.name = "data_element";
        nodeDataElement.radius = 30;

        const functionHookNodes = (nodeLHS, nodeRHS) => {

            nodeLHS.hookeChildren.push(nodeRHS);
            nodeRHS.hookeChildren.push(nodeLHS);
        };

        functionHookNodes(nodeObjectClass,
            nodeDataElementConcept);
        functionHookNodes(nodeProperty,
            nodeDataElementConcept);
        functionHookNodes(nodeValue,
            nodeRepresentation);
        functionHookNodes(nodeValueDomain,
            nodeRepresentation);
        functionHookNodes(nodeValueDomain,
            nodeDataElement);
        functionHookNodes(nodeDataElementConcept,
            nodeDataElement);

        // Position Cartesian: {0, 0}, at center of Canvas.
        context.translate(canvas.width / 2,
            canvas.height / 2);

        // Save date of last render so each render can scale its speed smoothly.
        let dateLastRender = new Date();
        const functionAnimate = () => {

            // Compute frame time.
            let dFrameMilliseconds = (new Date() - dateLastRender);
            dateLastRender = new Date();

            // Compute the nodes net force.
            arrayNodes.forEach((nodeChild) => {

                nodeChild.computeNetForce(nodeDataElement);
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

            // Render the links.
            arrayNodes.forEach((nodeChild) => {

                nodeChild.renderLinks(context,
                    nodeDataElement);
            });

            // Render the nodes.
            arrayNodes.forEach((nodeChild) => {

                nodeChild.render(context,
                    nodeDataElement);
            });

            // Render the node's names.
            arrayNodes.forEach((nodeChild) => {

                nodeChild.renderName(context,
                    nodeDataElement);
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
