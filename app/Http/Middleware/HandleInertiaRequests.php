<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Gate;


class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? $request->user()->load('role') : null,
                'abilities' => $this->getGateAbilities($request->user()),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'abilities' => $this->getGateAbilities($request->user()),
        ]);
    }

    private function getGateAbilities($user): array
    {
        if (!$user) {
            return [];
        }

        return [
            'is_admin' => Gate::forUser($user)->allows('is_admin'),
            'is_employee' => Gate::forUser($user)->allows('is_employee'),
        ];
    }
}
