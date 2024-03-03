import React, { CSSProperties, PureComponent } from "react";
import { Box } from "@mui/material";
import { Page } from "react-pdf";
import { ListChildComponentProps } from "react-window";

class PageRenderer extends PureComponent<ListChildComponentProps> {
	render() {
		const { index, style } = this.props;
		return (
			<Box sx={{ ...style }}>
				<Page
					key={`page_${index + 1}`}
					pageNumber={index + 1}
					renderAnnotationLayer={false}
				/>
			</Box>
		);
	}
}

export default PageRenderer;
