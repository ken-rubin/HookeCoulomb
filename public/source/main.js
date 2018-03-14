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

        nodeProperty.color = "rgba(0,72,72,0.5)";
        nodeProperty.name = "property";
        nodeProperty.mass = 1;
        nodeProperty.charge = 7;

        nodeObjectClass.color = "rgba(72,72,0,0.5)";
        nodeObjectClass.name = "object_class";
        nodeObjectClass.mass = 1;
        nodeObjectClass.charge = 7;

        nodeDataElementConcept.color = "rgba(0,0,100,0.5)";
        nodeDataElementConcept.name = "data_element_concept";
        nodeDataElementConcept.mass = 1;
        nodeDataElementConcept.radius = 35;

        nodeValue.color = "rgba(72,0,72,0.5)";
        nodeValue.name = "value";
        nodeValue.mass = 1;
        nodeValue.radius = 15;
        nodeValue.vertical = true;

        nodeRepresentation.color = "rgba(57,57,57,0.5)";
        nodeRepresentation.name = "representation";
        nodeRepresentation.mass = 1;
        nodeRepresentation.radius = 20;

        nodeValueDomain.color = "rgba(0,100,0,0.5)";
        nodeValueDomain.name = "value_domain";
        nodeValueDomain.mass = 1;
        nodeValueDomain.radius = 25;

        nodeDataElement.color = "rgba(100,0,0,0.5)";
        nodeDataElement.name = "data_element";
        nodeDataElement.mass = 1;
        nodeDataElement.radius = 40;

        let dMagnitude = 100;
        nodeDataElement.position = {

            x: Math.random() * 2 * dMagnitude - dMagnitude,
            y: Math.random() * 2 * dMagnitude - dMagnitude
        };
        nodeValueDomain.position = {

            x: Math.random() * 2 * dMagnitude - dMagnitude,
            y: Math.random() * 2 * dMagnitude - dMagnitude
        };
        nodeDataElementConcept.position = {

            x: Math.random() * 2 * dMagnitude - dMagnitude,
            y: Math.random() * 2 * dMagnitude - dMagnitude
        };
        nodeRepresentation.position = {

            x: Math.random() * 2 * dMagnitude - dMagnitude,
            y: Math.random() * 2 * dMagnitude - dMagnitude
        };
        nodeValue.position = {

            x: Math.random() * 2 * dMagnitude - dMagnitude,
            y: Math.random() * 2 * dMagnitude - dMagnitude
        };
        nodeProperty.position = {

            x: Math.random() * 2 * dMagnitude - dMagnitude,
            y: Math.random() * 2 * dMagnitude - dMagnitude
        };
        nodeObjectClass.position = {

            x: Math.random() * 2 * dMagnitude - dMagnitude,
            y: Math.random() * 2 * dMagnitude - dMagnitude
        };

        nodeObjectClass.hookeChildren.push(nodeDataElementConcept);
        nodeDataElementConcept.hookeChildren.push(nodeObjectClass);

        nodeProperty.hookeChildren.push(nodeDataElementConcept);
        nodeDataElementConcept.hookeChildren.push(nodeProperty);

        nodeValue.hookeChildren.push(nodeRepresentation);
        nodeRepresentation.hookeChildren.push(nodeValue);

        nodeValueDomain.hookeChildren.push(nodeRepresentation);
        nodeRepresentation.hookeChildren.push(nodeValueDomain);

        nodeValueDomain.hookeChildren.push(nodeDataElement);
        nodeDataElement.hookeChildren.push(nodeValueDomain);

        nodeDataElementConcept.hookeChildren.push(nodeDataElement);
        nodeDataElement.hookeChildren.push(nodeDataElementConcept);

        nodeObjectClass.coulombChildren.push(nodeProperty);
        nodeObjectClass.coulombChildren.push(nodeDataElementConcept);
        nodeObjectClass.coulombChildren.push(nodeValue);
        nodeObjectClass.coulombChildren.push(nodeRepresentation);
        nodeObjectClass.coulombChildren.push(nodeValueDomain);
        nodeObjectClass.coulombChildren.push(nodeDataElement);

        nodeProperty.coulombChildren.push(nodeObjectClass);
        nodeProperty.coulombChildren.push(nodeDataElementConcept);
        nodeProperty.coulombChildren.push(nodeValue);
        nodeProperty.coulombChildren.push(nodeRepresentation);
        nodeProperty.coulombChildren.push(nodeValueDomain);
        nodeProperty.coulombChildren.push(nodeDataElement);

        nodeDataElementConcept.coulombChildren.push(nodeObjectClass);
        nodeDataElementConcept.coulombChildren.push(nodeProperty);
        nodeDataElementConcept.coulombChildren.push(nodeValue);
        nodeDataElementConcept.coulombChildren.push(nodeRepresentation);
        nodeDataElementConcept.coulombChildren.push(nodeValueDomain);
        nodeDataElementConcept.coulombChildren.push(nodeDataElement);

        nodeValue.coulombChildren.push(nodeObjectClass);
        nodeValue.coulombChildren.push(nodeProperty);
        nodeValue.coulombChildren.push(nodeDataElementConcept);
        nodeValue.coulombChildren.push(nodeRepresentation);
        nodeValue.coulombChildren.push(nodeValueDomain);
        nodeValue.coulombChildren.push(nodeDataElement);

        nodeRepresentation.coulombChildren.push(nodeObjectClass);
        nodeRepresentation.coulombChildren.push(nodeProperty);
        nodeRepresentation.coulombChildren.push(nodeDataElementConcept);
        nodeRepresentation.coulombChildren.push(nodeValue);
        nodeRepresentation.coulombChildren.push(nodeValueDomain);
        nodeRepresentation.coulombChildren.push(nodeDataElement);

        nodeValueDomain.coulombChildren.push(nodeObjectClass);
        nodeValueDomain.coulombChildren.push(nodeProperty);
        nodeValueDomain.coulombChildren.push(nodeDataElementConcept);
        nodeValueDomain.coulombChildren.push(nodeValue);
        nodeValueDomain.coulombChildren.push(nodeRepresentation);
        nodeValueDomain.coulombChildren.push(nodeDataElement);

        nodeDataElement.coulombChildren.push(nodeObjectClass);
        nodeDataElement.coulombChildren.push(nodeProperty);
        nodeDataElement.coulombChildren.push(nodeDataElementConcept);
        nodeDataElement.coulombChildren.push(nodeValue);
        nodeDataElement.coulombChildren.push(nodeRepresentation);
        nodeDataElement.coulombChildren.push(nodeValueDomain);

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

                nodeChild.computeNetForce(nodeDataElement);
            });

            // Adjust positions....
            arrayNodes.forEach((nodeChild) => {

                nodeChild.computePosition(dFrameMilliseconds / 1000.0);
            });

            // Clear the frame.
            context.fillStyle = "rgb(255,255,255)";
            context.fillRect(-canvas.width / 2,
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

            // Render the nodes.
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
