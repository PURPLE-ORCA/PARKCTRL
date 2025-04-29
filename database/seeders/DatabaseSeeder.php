<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Service; 
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Use Model::create to trigger potential model events/observers if any
        $adminRole = Role::create([
            'name' => 'administrator',
            'description' => 'Administrateur général avec tous les privilèges.'
        ]);

        $employeeRole = Role::create([
            'name' => 'employee',
            'description' => 'Employé avec des privilèges restreints.'
        ]);

        // --- Seed Services ---
        $servicesData = [
            ['name' => 'Direction Générale', 'description' => 'Service de la direction générale.'], // ID: 1
            ['name' => 'Ressources Humaines', 'description' => 'Gestion du personnel et recrutement.'], // ID: 2
            ['name' => 'Finance et Comptabilité', 'description' => 'Gestion financière et comptable.'], // ID: 3
            ['name' => 'Informatique (IT)', 'description' => 'Support technique et infrastructure.'], // ID: 4
            ['name' => 'Marketing et Ventes', 'description' => 'Promotion et vente des produits/services.'], // ID: 5
            ['name' => 'Logistique et Stocks', 'description' => 'Gestion des flux et des inventaires.'], // ID: 6
            ['name' => 'Production', 'description' => 'Service de fabrication ou de production.'], // ID: 7
            ['name' => 'Maintenance Générale', 'description' => 'Entretien des locaux et équipements.'], // ID: 8
            ['name' => 'Nettoyage', 'description' => 'Service de propreté des locaux.'], // ID: 9
            ['name' => 'Sécurité', 'description' => 'Service de surveillance et sécurité.'], // ID: 10
            ['name' => 'Juridique', 'description' => 'Conseil et affaires juridiques.'], // ID: 11
            ['name' => 'Communication', 'description' => 'Communication interne et externe.'], // ID: 12
            ['name' => 'Achats', 'description' => 'Service des approvisionnements.'], // ID: 13
            ['name' => 'Qualité', 'description' => 'Contrôle et assurance qualité.'], // ID: 14
            ['name' => 'Recherche et Développement', 'description' => 'Innovation et développement de nouveaux produits.'], // ID: 15
        ];
        // Use insert for better performance on large datasets
        DB::table('services')->insert($servicesData);
        // Get service IDs if needed later, adjust if using Model::create
        $serviceIds = DB::table('services')->pluck('id')->toArray();

        // --- Seed Users ---
        $usersData = [
            // Administrator
            [
                'name' => 'Admin Principal',
                'email' => 'admin@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $adminRole->id,
                'service_id' => 1, // Direction Générale
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
             [
                'name' => 'Admin IT',
                'email' => 'admin.it@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $adminRole->id,
                'service_id' => 4, // IT
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
            // Employees
            [
                'name' => 'Jean Dupont',
                'email' => 'jean.dupont@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 2, // RH
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Marie Curie',
                'email' => 'marie.curie@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 3, // Finance
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Pierre Martin',
                'email' => 'pierre.martin@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 4, // IT
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Sophie Dubois',
                'email' => 'sophie.dubois@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 5, // Marketing/Ventes
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Lucas Bernard',
                'email' => 'lucas.bernard@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 6, // Logistique
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Camille Petit',
                'email' => 'camille.petit@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 7, // Production
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Antoine Moreau',
                'email' => 'antoine.moreau@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 8, // Maintenance
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
             [
                'name' => 'Employé Nettoyage 1',
                'email' => 'nettoyage1@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 9, // Nettoyage
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
             [
                'name' => 'Agent Sécurité Alpha',
                'email' => 'secu.alpha@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 10, // Sécurité
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Nathalie Leroy',
                'email' => 'nathalie.leroy@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 11, // Juridique
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
             [
                'name' => 'Julien Simon',
                'email' => 'julien.simon@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 12, // Communication
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
             [
                'name' => 'Isabelle Rousseau',
                'email' => 'isabelle.rousseau@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 13, // Achats
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
             [
                'name' => 'David Garcia',
                'email' => 'david.garcia@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 14, // Qualité
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
             [
                'name' => 'Laura Fernandez',
                'email' => 'laura.fernandez@ctrl.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => 15, // R&D
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ],
            // Add more employees randomly assigned to services
        ];

        // Add 30 more random employees
        for ($i = 1; $i <= 30; $i++) {
            $usersData[] = [
                'name' => 'Employé Random ' . $i,
                'email' => 'random.employe' . $i . '@entreprise.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => $serviceIds[array_rand($serviceIds)], // Assign random service ID
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ];
        }

         // Add a user without a service (maybe new hire)
         $usersData[] = [
                'name' => 'Nouvel Arrivant',
                'email' => 'nouvel.arrivant@entreprise.com',
                'password' => Hash::make('password'),
                'role_id' => $employeeRole->id,
                'service_id' => null, // No service yet
                'created_at' => Carbon::now(), 'updated_at' => Carbon::now()
            ];


        DB::table('users')->insert($usersData);
        // Get user IDs for assigning products/actions etc.
        $userIds = DB::table('users')->pluck('id')->toArray();
        $adminUserId = DB::table('users')->where('email', 'admin@ctrl.com')->value('id'); // Specific admin
        $adminItUserId = DB::table('users')->where('email', 'admin.it@ctrl.com')->value('id'); // Specific admin
        $employeeUserIds = DB::table('users')->where('role_id', $employeeRole->id)->pluck('id')->toArray();

    function randomPastDate($start = '-2 years', $end = 'now') {
        return Carbon::parse(fake()->dateTimeBetween($start, $end));
    }
            // --- Seed Products ---
    $productsData = [
        // IT Equipment
        ['name' => 'Laptop Dell Latitude 7400', 'serial_number' => 'DELL-LAT7400-A1B2C3', 'supplier' => 'Dell Technologies', 'price' => 1450.00, 'served_to' => $employeeUserIds[0] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Laptop HP EliteBook 840', 'serial_number' => 'HP-ELT840-X9Y8Z7', 'supplier' => 'HP Inc.', 'price' => 1380.50, 'served_to' => $employeeUserIds[1] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Écran Dell 24" P2419H', 'serial_number' => 'MON-DELL-P2419H-001', 'supplier' => 'Dell Technologies', 'price' => 220.00, 'served_to' => $employeeUserIds[0] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Écran Dell 24" P2419H', 'serial_number' => 'MON-DELL-P2419H-002', 'supplier' => 'Dell Technologies', 'price' => 220.00, 'served_to' => $employeeUserIds[1] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Écran LG 27" UltraGear', 'serial_number' => 'MON-LG-UG27-LG950', 'supplier' => 'LG Electronics', 'price' => 450.99, 'served_to' => $employeeUserIds[2] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Clavier Logitech MX Keys', 'serial_number' => 'KB-LOGI-MXK-S001', 'supplier' => 'Logitech', 'price' => 119.90, 'served_to' => $employeeUserIds[0] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Clavier Logitech MX Keys', 'serial_number' => 'KB-LOGI-MXK-S002', 'supplier' => 'Logitech', 'price' => 119.90, 'served_to' => $employeeUserIds[1] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Souris Logitech MX Master 3S', 'serial_number' => 'MOU-LOGI-MXM3S-G01', 'supplier' => 'Logitech', 'price' => 109.90, 'served_to' => $employeeUserIds[0] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Souris Logitech MX Master 3S', 'serial_number' => 'MOU-LOGI-MXM3S-G02', 'supplier' => 'Logitech', 'price' => 109.90, 'served_to' => $employeeUserIds[1] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Imprimante HP LaserJet Pro M404dn', 'serial_number' => 'PRN-HP-M404DN-112233', 'supplier' => 'HP Inc.', 'price' => 350.00, 'served_to' => null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Serveur Dell PowerEdge R740', 'serial_number' => 'SRV-DELL-R740-ABCDEF', 'supplier' => 'Dell Technologies', 'price' => 8500.00, 'served_to' => null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Casque Jabra Evolve 65', 'serial_number' => 'HDST-JBR-EV65-001', 'supplier' => 'Jabra', 'price' => 180.00, 'served_to' => $employeeUserIds[3] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Webcam Logitech C922 Pro', 'serial_number' => 'WCAM-LOGI-C922-1A2B', 'supplier' => 'Logitech', 'price' => 99.99, 'served_to' => $employeeUserIds[3] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Switch Cisco Catalyst 2960', 'serial_number' => 'SW-CIS-C2960-XYZ123', 'supplier' => 'Cisco Systems', 'price' => 1200.00, 'served_to' => null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],

        // Office Furniture & Supplies
        ['name' => 'Chaise de bureau ergonomique', 'serial_number' => 'CHR-ERG-BLK-001', 'supplier' => 'MobilierPro', 'price' => 280.00, 'served_to' => $employeeUserIds[0] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Chaise de bureau ergonomique', 'serial_number' => 'CHR-ERG-BLK-002', 'supplier' => 'MobilierPro', 'price' => 280.00, 'served_to' => $employeeUserIds[1] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Bureau Assis-Debout Électrique', 'serial_number' => 'DSK-STND-WHT-001', 'supplier' => 'OfficeDesign', 'price' => 550.00, 'served_to' => $employeeUserIds[2] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Table de réunion (8 pers.)', 'serial_number' => 'TBL-CONF-WOOD-L', 'supplier' => 'MobilierPro', 'price' => 950.00, 'served_to' => null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Tableau blanc magnétique 120x90', 'serial_number' => 'BRD-WHT-12090-01', 'supplier' => 'Papeterie Express', 'price' => 85.00, 'served_to' => null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Destructeur de documents Rexel', 'serial_number' => 'SHR-REX-AUTO100', 'supplier' => 'Bureau Vallée', 'price' => 199.99, 'served_to' => null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],

        // Other Equipment
        ['name' => 'Machine à café Nespresso Pro', 'serial_number' => 'COF-NES-ZENIUS-01', 'supplier' => 'Nespresso', 'price' => 450.00, 'served_to' => null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Aspirateur Pro Dyson V11', 'serial_number' => 'CLN-DYS-V11ABS-01', 'supplier' => 'Dyson SARL', 'price' => 599.00, 'served_to' => $employeeUserIds[8] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Chariot de nettoyage complet', 'serial_number' => 'CLN-CART-PRO-01', 'supplier' => 'HygiènePlus', 'price' => 180.00, 'served_to' => $employeeUserIds[8] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Talkie-Walkie Motorola T82 (paire)', 'serial_number' => 'COM-MOT-T82-P1', 'supplier' => 'Radiocom Pro', 'price' => 95.00, 'served_to' => $employeeUserIds[9] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Scanner de codes-barres Zebra DS2208', 'serial_number' => 'SCAN-ZEB-DS2208-01', 'supplier' => 'Logistique Solutions', 'price' => 150.00, 'served_to' => $employeeUserIds[4] ?? null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],

        // Stock products
        ['name' => 'Laptop Dell Latitude 7400', 'serial_number' => 'DELL-LAT7400-STOCK1', 'supplier' => 'Dell Technologies', 'price' => 1450.00, 'served_to' => null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Laptop Dell Latitude 7400', 'serial_number' => 'DELL-LAT7400-STOCK2', 'supplier' => 'Dell Technologies', 'price' => 1450.00, 'served_to' => null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Écran Dell 24" P2419H', 'serial_number' => 'MON-DELL-P2419H-STOCK1', 'supplier' => 'Dell Technologies', 'price' => 220.00, 'served_to' => null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Clavier Logitech MX Keys', 'serial_number' => 'KB-LOGI-MXK-STOCK1', 'supplier' => 'Logitech', 'price' => 119.90, 'served_to' => null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Souris Logitech MX Master 3S', 'serial_number' => 'MOU-LOGI-MXM3S-STOCK1', 'supplier' => 'Logitech', 'price' => 109.90, 'served_to' => null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
        ['name' => 'Chaise de bureau ergonomique', 'serial_number' => 'CHR-ERG-BLK-STOCK1', 'supplier' => 'MobilierPro', 'price' => 280.00, 'served_to' => null, 'created_at' => $createdAt = randomPastDate(), 'updated_at' => $createdAt->copy()->addDays(rand(0, 120))],
    ];

    DB::table('products')->insert($productsData);

        $productIds = DB::table('products')->pluck('id')->toArray();
        // Get specific product IDs for actions/notifications
        $laptopStock1Id = DB::table('products')->where('serial_number', 'DELL-LAT7400-STOCK1')->value('id');
        $laptopJeanDupontId = DB::table('products')->where('serial_number', 'DELL-LAT7400-A1B2C3')->value('id');
        $chaiseMarieCurieId = DB::table('products')->where('serial_number', 'CHR-ERG-BLK-002')->value('id');
        $aspirateurId = DB::table('products')->where('serial_number', 'CLN-DYS-V11ABS-01')->value('id');


        // --- Seed Actions ---
        $actionsData = [
            [
                'product_id' => $laptopStock1Id, // Laptop Stock 1
                'user_id' => $adminItUserId, // Admin IT
                'action' => 'assigné',
                'details' => 'Assignation du Laptop DELL-LAT7400-STOCK1 à Sophie Dubois (Marketing).',
                'created_at' => Carbon::now()->subDays(5), 'updated_at' => Carbon::now()->subDays(5)
            ],
            [
                'product_id' => $laptopJeanDupontId, // Laptop Jean Dupont
                'user_id' => $adminItUserId, // Admin IT
                'action' => 'maintenance',
                'details' => 'Intervention sur le laptop DELL-LAT7400-A1B2C3 : Remplacement batterie.',
                'created_at' => Carbon::now()->subDays(10), 'updated_at' => Carbon::now()->subDays(10)
            ],
             [
                'product_id' => $chaiseMarieCurieId, // Chaise Marie Curie
                'user_id' => $adminUserId, // Admin Principal
                'action' => 'déplacé',
                'details' => 'Chaise CHR-ERG-BLK-002 déplacée du bureau 201 au bureau 205.',
                 'created_at' => Carbon::now()->subDays(2), 'updated_at' => Carbon::now()->subDays(2)
            ],
            [
                'product_id' => $aspirateurId, // Aspirateur
                'user_id' => $adminUserId, // Admin Principal (or maintenance lead)
                'action' => 'reçu',
                'details' => 'Réception et enregistrement de l\'aspirateur CLN-DYS-V11ABS-01 depuis fournisseur Dyson SARL.',
                'created_at' => Carbon::now()->subMonths(1), 'updated_at' => Carbon::now()->subMonths(1)
            ],
             [
                'product_id' => $laptopJeanDupontId, // Laptop Jean Dupont
                'user_id' => $employeeUserIds[0] ?? $adminUserId, // Jean Dupont returning it? Or Admin logging return?
                'action' => 'retourné',
                'details' => 'Retour du laptop DELL-LAT7400-A1B2C3 au stock IT (Fin de contrat employé).', // Hypothetical scenario
                'created_at' => Carbon::now()->subDays(1), 'updated_at' => Carbon::now()->subDays(1)
            ],
            [
                'product_id' => $productIds[array_rand($productIds)], // Random product
                'user_id' => $adminUserId,
                'action' => 'inventaire',
                'details' => 'Vérification d\'inventaire - Produit confirmé présent.',
                'created_at' => Carbon::now()->subHours(6), 'updated_at' => Carbon::now()->subHours(6)
            ]
        ];
        DB::table('actions')->insert($actionsData);

        // --- Seed Help Requests ---
        $helpRequestsData = [
            [
                'user_id'    => $employeeUserIds[0] ?? $adminUserId, // Jean Dupont
                'product_id' => $laptopJeanDupontId, // His Laptop
                'description'=> 'Mon laptop surchauffe et s\'éteint tout seul après 1h d\'utilisation.',
                'status'     => 'in_progress', // en cours
                'created_at' => Carbon::now()->subDays(2), 'updated_at' => Carbon::now()->subHours(5)
            ],
             [
                'user_id'    => $employeeUserIds[1] ?? $adminUserId, // Marie Curie
                'product_id' => DB::table('products')->where('serial_number', 'MON-DELL-P2419H-002')->value('id'), // Her Screen
                'description'=> 'L\'écran affiche des lignes vertes intermittentes.',
                'status'     => 'resolved', // résolu
                'created_at' => Carbon::now()->subDays(4), 'updated_at' => Carbon::now()->subHours(2) // Match notification time
            ],
             [
                'user_id'    => $employeeUserIds[2] ?? $adminUserId, // Pierre Martin (IT) - even IT needs help sometimes!
                'product_id' => DB::table('products')->where('serial_number', 'DSK-STND-WHT-001')->value('id'), // His Standing Desk
                'description'=> 'Le mécanisme électrique du bureau assis-debout est bloqué en position basse.',
                'status'     => 'pending', // en attente
                'created_at' => Carbon::now()->subDay(), 'updated_at' => Carbon::now()->subDay()
            ],
            [
                'user_id'    => $employeeUserIds[3] ?? $adminUserId, // Sophie Dubois (Sales)
                'product_id' => DB::table('products')->where('serial_number', 'HDST-JBR-EV65-001')->value('id'), // Her Headset
                'description'=> 'Impossible de connecter le casque Jabra en Bluetooth à mon ordinateur portable.',
                'status'     => 'pending',
                'created_at' => Carbon::now()->subHours(3), 'updated_at' => Carbon::now()->subHours(3)
            ],
             [
                'user_id'    => $employeeUserIds[4] ?? $adminUserId, // Lucas Bernard (Logistique)
                'product_id' => DB::table('products')->where('serial_number', 'SCAN-ZEB-DS2208-01')->value('id'), // His Scanner
                'description'=> 'Le scanner de code-barres ne lit plus certains types de codes.',
                'status'     => 'in_progress',
                'created_at' => Carbon::now()->subDays(1), 'updated_at' => Carbon::now()->subHours(1)
            ],
            [
                'user_id'    => $employeeUserIds[5] ?? $adminUserId, // Camille Petit (Production)
                'product_id' => $productIds[array_rand($productIds)], // Maybe a shared resource she uses
                'description'=> 'Besoin d\'accès à un logiciel spécifique non installé sur le poste partagé.',
                'status'     => 'closed', // fermé (maybe resolved differently)
                'created_at' => Carbon::now()->subWeeks(2), 'updated_at' => Carbon::now()->subWeeks(1)
            ],
             [
                'user_id'    => $employeeUserIds[8] ?? $adminUserId, // Employé Nettoyage 1
                'product_id' => $aspirateurId, // Aspirateur
                'description'=> 'L\'aspirateur a perdu de la puissance d\'aspiration.',
                'status'     => 'pending',
                'created_at' => Carbon::now()->subHours(6), 'updated_at' => Carbon::now()->subHours(6)
            ],
              [
                'user_id'    => $employeeUserIds[0] ?? $adminUserId, // Jean Dupont
                'product_id' => DB::table('products')->where('serial_number', 'KB-LOGI-MXK-S001')->value('id'), // His Keyboard
                'description'=> 'La touche "E" de mon clavier MX Keys est devenue dure.',
                'status'     => 'pending',
                'created_at' => Carbon::now()->subMinutes(30), 'updated_at' => Carbon::now()->subMinutes(30)
            ],
             // Add ~10 more varied requests
             [
                'user_id'    => $employeeUserIds[6] ?? $adminUserId, // Antoine Moreau (Maintenance)
                'product_id' => null, // No specific product - general request
                'description'=> 'Besoin d\'une formation sur le nouveau système de gestion des tickets.',
                'status'     => 'resolved',
                'created_at' => Carbon::now()->subMonths(1), 'updated_at' => Carbon::now()->subWeeks(3)
             ],
              [
                'user_id'    => $employeeUserIds[7] ?? $adminUserId, // Employee Random
                'product_id' => null,
                'description'=> 'J\'ai oublié mon mot de passe Windows.',
                'status'     => 'resolved',
                'created_at' => Carbon::now()->subDays(5), 'updated_at' => Carbon::now()->subDays(5)
             ],
              [
                'user_id'    => $employeeUserIds[10] ?? $adminUserId, // Employee Random
                'product_id' => DB::table('products')->where('serial_number', 'PRN-HP-M404DN-112233')->value('id'), // Shared Printer
                'description'=> 'L\'imprimante partagée est bloquée (bourrage papier?).',
                'status'     => 'in_progress',
                'created_at' => Carbon::now()->subHours(1), 'updated_at' => Carbon::now()->subMinutes(15)
             ],
             // ... add more similar entries ...
        ];
        DB::table('help_requests')->insert($helpRequestsData);

    }
}