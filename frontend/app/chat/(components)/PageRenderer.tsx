import React, { PureComponent } from "react";
import { Box } from "@mui/material";
import { Page } from "react-pdf";
import { ListChildComponentProps } from "react-window";

import styles from "./chat.module.css";

class PageRenderer extends PureComponent<ListChildComponentProps> {
	render() {
		const { index, style, data } = this.props;
		const { pdfHeight, textRenderer } = data;

		return (
			<Box sx={{ ...style }}>
				{/* in case of emergency can attempt styles.page width = fit-content */}
				<Page
					className={styles.page}
					height={pdfHeight}
					key={`page_${index + 1}`}
					pageNumber={index + 1}
					renderAnnotationLayer={false}
					customTextRenderer={textRenderer}
				/>
			</Box>
		);
	}
}

export default PageRenderer;
