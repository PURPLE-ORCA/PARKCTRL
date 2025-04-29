import React, { useState, useContext } from "react";
import Layout from "@/Layouts/Layout";


export default function Dashboard({
}) {

    return (
        <Layout>
            <h1 className="flex justify-center text-3xl font-bold text-gray-900 dark:text-white mt-10">
                Bonjour dans le Tableau de bord
            </h1>
        </Layout>
    );
}
