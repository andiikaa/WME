<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<table class="data_table" id="data_table_1">
			<colgroup>
				<col id="data_table_col_1"/>
                <col id="data_table_col_2"/>
                <col id="data_table_col_3"/>
                <col id="data_table_col_4"/>
                <col id="data_table_col_5"/>
                <col id="data_table_col_6"/>
                <col id="data_table_col_7"/>
            </colgroup>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Country
						<Button class="sort_button" onclick="sort('data_table_1', 1, 0)"><i class="fa fa-angle-down"></i></Button>
                        <Button class="sort_button" onclick="sort('data_table_1', 1, 1)"><i class="fa fa-angle-up"></i></Button>
                    </th>
                    <th>birth rate /1000</th>
                    <th>cellphones /100</th>
                    <th>children / woman</th>
                    <th>electric usage</th>
                    <th>internet usage</th>
                </tr>
            </thead>
            <tbody>	
			<xsl:for-each select="Countries/Country">
				<tr>
					<td><xsl:value-of select="id"/></td>
					<td><xsl:value-of select="name"/></td>
					<td><xsl:value-of select="birth"/></td>
					<td><xsl:value-of select="cell"/></td>
					<td><xsl:value-of select="children"/></td>
					<td><xsl:value-of select="electricity"/></td>
					<td><xsl:value-of select="internet"/></td>			
				</tr>
			</xsl:for-each>
            </tbody>
         </table>		
	</xsl:template>
</xsl:stylesheet>